from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('tmp_list/', views.tmpList),
    path('tmp_reviewC/<int:movie_pk>/', views.tmpReviewCreate), # 리뷰 쓰기
    path('comment/<int:review_pk>/', views.createComment), # 리뷰에 댓글
    path('like/<int:movie_pk>/', views.likeMovie),  #영화 좋아요
    path('like-list/', views.likeList),
    path('like-list-Detail/', views.likeListDetail),
    path('algorithm/', views.algorithm),
    path('my-review/<username>/', views.reviewcount), # 사용자가 쓴 리뷰 
    path('reviews/<int:movie_pk>/', views.movieReviews), # 특정영화에 대한 리뷰 목록가져오기
    path('like-review/<int:review_pk>/', views.likeReview),  #리뷰 좋아요
    path('like-reviews-list/', views.likeReviewList), # 내가 좋아요한 리뷰 리스트 뽑기
    path('search/', views.searchMovie),
    path('genres-gage/', views.genreGage), # 장르 기반 영화 게이지 계산
    path('movie-infomation/<int:movie_pk>/', views.movie_infomation), # 특정 영화 정보 조회
    path('top-review-movie/', views.TopReviewMovie), # 좋아요 순으로 리뷰 정렬
    path('review/<int:review_pk>/', views.reviewUpdate), # 좋아요 순으로 리뷰 정렬
    
]