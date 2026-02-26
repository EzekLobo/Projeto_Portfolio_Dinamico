from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api_portfolio.Viewsets import ProjetoViewSet

router = DefaultRouter()
router.register(r'projetos', ProjetoViewSet)

urlpatterns = [
    path('', include(router.urls)), 
]
