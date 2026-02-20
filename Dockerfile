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
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID

# 누락 방지용 검증
RUN test -n "$VITE_BASE_URL" || (echo "Error: VITE_BASE_URL build-arg is required" >&2 && exit 1)
RUN test -n "$VITE_KAKAO_JAVASCRIPT_KEY" || (echo "Error: VITE_KAKAO_JAVASCRIPT_KEY build-arg is required" >&2 && exit 1)

RUN test -n "$VITE_FIREBASE_API_KEY" || (echo "Error: VITE_FIREBASE_API_KEY build-arg is required" >&2 && exit 1)
RUN test -n "$VITE_FIREBASE_AUTH_DOMAIN" || (echo "Error: VITE_FIREBASE_AUTH_DOMAIN build-arg is required" >&2 && exit 1)
RUN test -n "$VITE_FIREBASE_PROJECT_ID" || (echo "Error: VITE_FIREBASE_PROJECT_ID build-arg is required" >&2 && exit 1)
RUN test -n "$VITE_FIREBASE_STORAGE_BUCKET" || (echo "Error: VITE_FIREBASE_STORAGE_BUCKET build-arg is required" >&2 && exit 1)
RUN test -n "$VITE_FIREBASE_MESSAGING_SENDER_ID" || (echo "Error: VITE_FIREBASE_MESSAGING_SENDER_ID build-arg is required" >&2 && exit 1)
RUN test -n "$VITE_FIREBASE_APP_ID" || (echo "Error: VITE_FIREBASE_APP_ID build-arg is required" >&2 && exit 1)

# 빌드 시점에 환경변수로 전달
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_KAKAO_JAVASCRIPT_KEY=${VITE_KAKAO_JAVASCRIPT_KEY}

# 의존성 설치
ENV VITE_FIREBASE_API_KEY=${VITE_FIREBASE_API_KEY}
ENV VITE_FIREBASE_AUTH_DOMAIN=${VITE_FIREBASE_AUTH_DOMAIN}
ENV VITE_FIREBASE_PROJECT_ID=${VITE_FIREBASE_PROJECT_ID}
ENV VITE_FIREBASE_STORAGE_BUCKET=${VITE_FIREBASE_STORAGE_BUCKET}
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=${VITE_FIREBASE_MESSAGING_SENDER_ID}
ENV VITE_FIREBASE_APP_ID=${VITE_FIREBASE_APP_ID}

COPY package*.json ./
RUN npm ci

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# dist/firebase-messaging-sw.js 생성(치환)
RUN cp /app/dist/firebase-messaging-sw.template.js /app/dist/firebase-messaging-sw.js && \
    sed -i "s|__FIREBASE_API_KEY__|${VITE_FIREBASE_API_KEY}|g" /app/dist/firebase-messaging-sw.js && \
    sed -i "s|__FIREBASE_AUTH_DOMAIN__|${VITE_FIREBASE_AUTH_DOMAIN}|g" /app/dist/firebase-messaging-sw.js && \
    sed -i "s|__FIREBASE_PROJECT_ID__|${VITE_FIREBASE_PROJECT_ID}|g" /app/dist/firebase-messaging-sw.js && \
    sed -i "s|__FIREBASE_STORAGE_BUCKET__|${VITE_FIREBASE_STORAGE_BUCKET}|g" /app/dist/firebase-messaging-sw.js && \
    sed -i "s|__FIREBASE_MESSAGING_SENDER_ID__|${VITE_FIREBASE_MESSAGING_SENDER_ID}|g" /app/dist/firebase-messaging-sw.js && \
    sed -i "s|__FIREBASE_APP_ID__|${VITE_FIREBASE_APP_ID}|g" /app/dist/firebase-messaging-sw.js && \
    rm -f /app/dist/firebase-messaging-sw.js.template


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