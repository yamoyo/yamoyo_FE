# ========================================
# Yamoyo Frontend - Nginx Image
# ========================================

# ========================================
# 1. Build Stage
# ========================================
FROM node:25-alpine AS builder

WORKDIR /app

# 빌드 인자 선언
ARG VITE_BASE_URL
ARG VITE_KAKAO_JAVASCRIPT_KEY
ARG VITE_KAKAO_TEMPLATE_ID
RUN test -n "$VITE_BASE_URL" || (echo "Error: VITE_BASE_URL build-arg is required" >&2 && exit 1)
RUN test -n "$VITE_KAKAO_JAVASCRIPT_KEY" || (echo "Error: VITE_KAKAO_JAVASCRIPT_KEY build-arg is required" >&2 && exit 1)
RUN test -n "$VITE_KAKAO_TEMPLATE_ID" || (echo "Error: VITE_KAKAO_TEMPLATE_ID build-arg is required" >&2 && exit 1)
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_KAKAO_JAVASCRIPT_KEY=${VITE_KAKAO_JAVASCRIPT_KEY}
ENV VITE_KAKAO_TEMPLATE_ID=${VITE_KAKAO_TEMPLATE_ID}

# 의존성 설치
COPY package*.json ./
RUN npm ci

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# ========================================
# 2. Runtime Stage (Nginx)
# ========================================
FROM nginx:stable-alpine

# 빌드 결과물 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 헬스체크
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --spider -q http://localhost:80/health || exit 1

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]