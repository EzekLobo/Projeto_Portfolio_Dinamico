from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from api_portfolio.Models.controle_dispositivo import ControleDispositivo
from api_portfolio.Serializers.controle_dispositivo_serializer import ControleDispositivoSerializer

class ControleDispositivoViewSet(viewsets.ModelViewSet):
    queryset = ControleDispositivo.objects.all()
    serializer_class = ControleDispositivoSerializer

    # 1. Rota para o Portfólio Next.js enviar o Nome (POST)
    # Rota: /api/v1/controle-dispositivo/solicitar_oi/
    @action(detail=False, methods=['post'], permission_classes=[AllowAny], authentication_classes=[])
    def solicitar_oi(self, request):
        # Pegamos o nome do visitante e o ID do dispositivo
        nome_visitante = request.data.get('nome', 'Alguém')
        id_dispositivo = request.data.get('dispositivo', 'pico_w_01')

        # O 'update_or_create' evita o erro de duplicidade. 
        # Ele procura o dispositivo; se achar, atualiza os dados; se não, cria um novo.
        controle, created = ControleDispositivo.objects.update_or_create(
            dispositivo=id_dispositivo,
            defaults={
                'ultima_mensagem': nome_visitante,
                'status_pendente': True  # Ativa o sinal para o Pico W buscar
            }
        )

        return Response({
            "status": "sucesso",
            "visitante": nome_visitante,
            "detalhes": "Dispositivo registrado" if created else "Mensagem atualizada"
        }, status=status.HTTP_200_OK)

    # 2. Rota para o Raspberry Pi Pico W buscar o Nome (GET)
    # Rota: /api/v1/controle-dispositivo/checar_oi/?dispositivo=pico_w_01
    @action(detail=False, methods=['get'], permission_classes=[AllowAny], authentication_classes=[])
    def checar_oi(self, request):
        id_dispositivo = request.query_params.get('dispositivo', 'pico_w_01')
        
        # Tenta localizar o dispositivo no banco
        controle = ControleDispositivo.objects.filter(dispositivo=id_dispositivo).first()

        # Verifica se o objeto existe E se o status_pendente está ligado (True)
        if controle and controle.status_pendente:
            nome_para_exibir = controle.ultima_mensagem
            
            # TRAVA DE SEGURANÇA: Desligamos o status imediatamente.
            # Isso garante que a mensagem só apareça UMA VEZ no seu display.
            controle.status_pendente = False
            controle.save()
            
            return Response({
                "tem_oi": True, 
                "nome": nome_para_exibir
            }, status=status.HTTP_200_OK)
            
        # Se não houver nada novo, a placa recebe False e não faz nada
        return Response({
            "tem_oi": False,
            "nome": ""
        }, status=status.HTTP_200_OK)