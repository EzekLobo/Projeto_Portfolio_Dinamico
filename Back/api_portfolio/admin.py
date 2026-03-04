from django.contrib import admin
from .Models import Projeto, InformacoesPessoais, Experiencia, ControleDispositivo, LeituraAmbiente

@admin.register(Projeto)
class ProjetoAdmin(admin.ModelAdmin):
    # Colunas que aparecerão na lista principal
    list_display = ('id', 'titulo', 'tecnologia', 'criado_em')
    # Permite clicar no título para editar
    list_display_links = ('id', 'titulo')
    # Adiciona um campo de busca por título ou tecnologia
    search_fields = ('titulo', 'tecnologia')
    # Filtro lateral por data
    list_filter = ('criado_em',)

@admin.register(Experiencia)
class ExperienciaAdmin(admin.ModelAdmin):
    list_display = ('empresa', 'cargo', 'data_inicio', 'atual')
    list_filter = ('atual', 'empresa')
    search_fields = ('empresa', 'cargo')

@admin.register(InformacoesPessoais)
class InformacoesPessoaisAdmin(admin.ModelAdmin):
    list_display = ('nome', 'email', 'telefone')

# ==========================================
# ADMIN DOS DISPOSITIVOS IOT
# ==========================================

@admin.register(LeituraAmbiente)
class LeituraAmbienteAdmin(admin.ModelAdmin):
    # Mostra os dados térmicos e a hora exata da leitura
    list_display = ('id', 'dispositivo', 'temperatura', 'umidade', 'data_hora')
    list_display_links = ('id', 'dispositivo')
    # Filtros úteis para achar leituras de dias específicos ou de placas diferentes
    list_filter = ('dispositivo', 'data_hora')
    search_fields = ('dispositivo',)

@admin.register(ControleDispositivo)
class ControleDispositivoAdmin(admin.ModelAdmin):
    list_display = ('id', 'dispositivo', 'quantidade_ois')
    list_display_links = ('id', 'dispositivo')
    
    # Permite editar a quantidade de cliques na fila direto pela tela do Admin
    list_editable = ('quantidade_ois',) 
    list_filter = ('quantidade_ois',)
    search_fields = ('dispositivo',)