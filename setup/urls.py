from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin 
from django.urls import path, include
from django.views.generic import RedirectView 

urlpatterns = [
    # Painel Administrativo
    path('admin/', admin.site.urls),
    
    # Rotas da API
    path('api/v1/', include('api_portfolio.urls')),
    
    # Redirecionamento da Raiz para a documentação da API
    path('', RedirectView.as_view(url='/api/v1/')), 
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)