# Dockerfile

# ベースイメージとしてNode.jsを使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

RUN npm i -g @nestjs/cli
RUN npm i --save-dev @types/node
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド前に古いビルドファイルを削除
# RUN rm -rf dist

# アプリケーションをビルド
RUN npm run build

RUN ls

# アプリケーションを起動
CMD ["npm", "run", "start:dev"]

# アプリケーションのポートを開放
EXPOSE 3000
