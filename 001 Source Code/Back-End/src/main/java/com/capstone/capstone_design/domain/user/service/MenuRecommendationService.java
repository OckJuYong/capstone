package com.capstone.capstone_design.domain.user.service;

import com.capstone.capstone_design.domain.user.dto.MenuRecommendation;
import com.capstone.capstone_design.domain.user.dto.UserTasteDto;
import com.capstone.capstone_design.domain.user.repository.UserRepository;
import io.qdrant.client.QdrantClient;
import io.qdrant.client.grpc.Points;
import io.qdrant.client.grpc.Points.SearchPoints;
import io.qdrant.client.grpc.JsonWithInt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MenuRecommendationService {

    private final QdrantClient qdrantClient;
    private static final String COLLECTION_NAME = "menu_recommendations";
    private static final int CANDIDATE_SIZE = 15; // 후보 메뉴 개수
    private final UserService userService;
    private final UserRepository userRepository;

    public List<MenuRecommendation> getRecommendationsForCurrentUser() {
        UserTasteDto userTaste = userService.getMyTastes();
        return recommendMenus(userTaste);
    }

    public List<MenuRecommendation> recommendMenus(UserTasteDto userTaste) {
        try {
            List<Float> floatVector = getNormalizedUserVector(userTaste);
            List<Points.ScoredPoint> candidates = searchCandidateMenus(floatVector);
            List<MenuRecommendation> recommendations = processCandidates(candidates);
            return recommendations.stream().limit(5).collect(Collectors.toList());
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Qdrant 벡터 검색 실패", e);
        }
    }

    private List<Float> getNormalizedUserVector(UserTasteDto taste) {
        double[] userVector = {
                (taste.getUmami().doubleValue() - 1) / 4.0,
                (taste.getSweet().doubleValue() - 1) / 4.0,
                (taste.getSour().doubleValue() - 1) / 4.0,
                (taste.getSpicy().doubleValue() - 1) / 4.0,
                (taste.getBitter().doubleValue() - 1) / 4.0,
                (taste.getSalty().doubleValue() - 1) / 4.0
        };
        double norm = Math.sqrt(Arrays.stream(userVector).map(v -> v * v).sum());
        double[] normalized = norm > 0 ?
                Arrays.stream(userVector).map(v -> v / norm).toArray() :
                userVector;

        return Arrays.stream(normalized).mapToObj(v -> (float) v).collect(Collectors.toList());
    }

    private List<Points.ScoredPoint> searchCandidateMenus(List<Float> vector)
            throws InterruptedException, ExecutionException {
        SearchPoints searchPoints = SearchPoints.newBuilder()
                .setCollectionName(COLLECTION_NAME)
                .addAllVector(vector)
                .setLimit(CANDIDATE_SIZE)
                .setWithPayload(Points.WithPayloadSelector.newBuilder().setEnable(true).build())
                .build();

        return qdrantClient.searchAsync(searchPoints).get();
    }

    private List<MenuRecommendation> processCandidates(List<Points.ScoredPoint> candidates) {
        List<Map.Entry<Float, MenuRecommendation>> tempList = new ArrayList<>();

        for (Points.ScoredPoint point : candidates) {
            MenuRecommendation rec = mapToMenuRecommendation(point);
            float similarity = point.getScore(); // 순수 유사도만 사용
            tempList.add(new AbstractMap.SimpleEntry<>(similarity, rec));
        }

        tempList.sort((a, b) -> Float.compare(b.getKey(), a.getKey()));

        return tempList.stream()
                .map(Map.Entry::getValue)
                .collect(Collectors.toList());
    }

    private MenuRecommendation mapToMenuRecommendation(Points.ScoredPoint point) {
        Map<String, JsonWithInt.Value> payload = point.getPayloadMap();

        MenuRecommendation rec = new MenuRecommendation();
        rec.setRestaurant(payload.get("restaurant").getStringValue());
        rec.setMenu(payload.get("menu").getStringValue());
        rec.setSimilarityScore(point.getScore());
        rec.setReviewCount((int) payload.get("total_count").getIntegerValue());

        JsonWithInt.Value tasteValue = payload.get("taste_profile");
        JsonWithInt.Struct tasteStruct = tasteValue.getStructValue();
        Map<String, JsonWithInt.Value> tasteFields = tasteStruct.getFieldsMap();

        UserTasteDto profile = new UserTasteDto(
                BigDecimal.valueOf(roundToOneDecimal(tasteFields.get("spicy").getDoubleValue())),
                BigDecimal.valueOf(roundToOneDecimal(tasteFields.get("umami").getDoubleValue())),
                BigDecimal.valueOf(roundToOneDecimal(tasteFields.get("sour").getDoubleValue())),
                BigDecimal.valueOf(roundToOneDecimal(tasteFields.get("sweet").getDoubleValue())),
                BigDecimal.valueOf(roundToOneDecimal(tasteFields.get("salty").getDoubleValue())),
                BigDecimal.valueOf(roundToOneDecimal(tasteFields.get("bitter").getDoubleValue()))
        );

        rec.setUserTasteDto(profile);
        return rec;
    }

    private double roundToOneDecimal(double value) {
        return Math.round(value * 10) / 10.0;
    }

}
