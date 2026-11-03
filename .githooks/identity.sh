#!/bin/sh
# 이 저장소에서 허용하는 유일한 커밋 계정
ALLOWED_NAME="jusiai-games"
ALLOWED_EMAIL="jusiai.games@gmail.com"

# "Name <email> timestamp tz" 형식에서 "Name <email>" 부분만 추출
ident_of() {
  printf '%s\n' "$1" | sed 's/^\(.*>\).*$/\1/'
}

ALLOWED_IDENT="$ALLOWED_NAME <$ALLOWED_EMAIL>"

fail_identity() {
  echo "" >&2
  echo "✖ $1 계정이 허용되지 않습니다: $2" >&2
  echo "  이 저장소는 '$ALLOWED_IDENT' 로만 커밋할 수 있습니다." >&2
  echo "" >&2
  echo "  git config user.name \"$ALLOWED_NAME\"" >&2
  echo "  git config user.email \"$ALLOWED_EMAIL\"" >&2
  echo "" >&2
  exit 1
}
