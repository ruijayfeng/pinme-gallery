#!/bin/bash

# @pin 触发脚本
# 使用方法: ./scripts/pin.sh <url> <description> [category] [tech_stack]
# 示例: ./scripts/pin.sh "https://xxx.pinme.dev" "加密聊天室" "web" "HTML,CSS,JavaScript"

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查参数
if [ -z "$1" ]; then
  echo -e "${RED}错误: 请提供 URL${NC}"
  echo "使用方法: ./scripts/pin.sh <url> <description> [category] [tech_stack]"
  echo "示例: ./scripts/pin.sh \"https://xxx.pinme.dev\" \"加密聊天室\" \"web\" \"HTML,CSS,JavaScript\""
  exit 1
fi

if [ -z "$2" ]; then
  echo -e "${RED}错误: 请提供描述${NC}"
  echo "使用方法: ./scripts/pin.sh <url> <description> [category] [tech_stack]"
  echo "示例: ./scripts/pin.sh \"https://xxx.pinme.dev\" \"加密聊天室\" \"web\" \"HTML,CSS,JavaScript\""
  exit 1
fi

URL=$1
DESCRIPTION=$2
CATEGORY=${3:-"web"}
TECH_STACK=${4:-"HTML,CSS,JavaScript"}

# 生成项目 ID
ID=$(date +%Y%m%d%H%M%S)

# 生成项目文件名
FILENAME="src/data/projects.json"

# 检查文件是否存在
if [ ! -f "$FILENAME" ]; then
  echo -e "${RED}错误: 数据文件不存在: $FILENAME${NC}"
  exit 1
fi

# 读取现有数据
EXISTING=$(cat "$FILENAME")

# 转换技术栈为数组
TECH_STACK_ARRAY=$(echo "$TECH_STACK" | tr ',' '\n' | sed 's/^/"/;s/$/"/' | tr '\n' ',' | sed 's/,$//')

# 添加新项目
NEW_PROJECT=$(cat <<EOF
{
  "id": $ID,
  "title": "$DESCRIPTION",
  "description": "$DESCRIPTION",
  "techStack": [$TECH_STACK_ARRAY],
  "pinmeUrl": "$URL",
  "githubUrl": "",
  "createdAt": "$(date +%Y-%m-%d)",
  "category": "$CATEGORY",
  "tags": ["PinMe"]
}
EOF
)

# 更新 JSON 文件
echo "$EXISTING" | jq ". + [$NEW_PROJECT]" > "$FILENAME"

echo -e "${GREEN}✅ 已添加项目: $DESCRIPTION${NC}"
echo -e "${GREEN}🔗 链接: $URL${NC}"
echo -e "${GREEN}📁 文件: $FILENAME${NC}"
echo -e "${GREEN}🚀 请运行 'npm run build' 构建项目${NC}"
