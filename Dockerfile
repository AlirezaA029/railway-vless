FROM debian:bullseye-slim

# نصب ابزارهای لازم
RUN apt-get update && apt-get install -y wget unzip && rm -rf /var/lib/apt/lists/*

# دانلود آخرین نسخه Xray-core
RUN wget https://github.com/XTLS/Xray-core/releases/latest/download/Xray-linux-64.zip -O /xray.zip \
    && unzip /xray.zip -d /usr/bin/ \
    && chmod +x /usr/bin/xray \
    && rm /xray.zip

# کپی کانفیگ
COPY config.json /etc/xray/config.json

# تنظیم پورت Railway
ENV PORT=3000
EXPOSE 3000

# اجرای Xray
CMD [ "xray", "-config", "/etc/xray/config.json" ]
