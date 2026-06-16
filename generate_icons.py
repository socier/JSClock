import os
from PIL import Image, ImageDraw, ImageFont

def get_font(font_name, size):
    paths = [
        font_name,
        os.path.join("C:\\Windows\\Fonts", font_name),
        os.path.join("C:\\winnt\\Fonts", font_name),
    ]
    for path in paths:
        try:
            return ImageFont.truetype(path, size)
        except IOError:
            continue
    return ImageFont.load_default()

def get_text_bbox(draw, text, font):
    try:
        # Newer Pillow versions (10.0.0+)
        return draw.textbbox((0, 0), text, font=font)
    except AttributeError:
        # Older Pillow versions
        w, h = draw.textsize(text, font=font)
        return (0, 0, w, h)

def create_icon(size):
    # 1. 메인 배경 이미지 생성 (검은색)
    img = Image.new('RGB', (size, size), color=(10, 10, 10))
    draw = ImageDraw.Draw(img)
    
    # 2. 플립 클럭 카드 배경 (둥근 사각형) 그리기
    margin = size * 0.08
    card_color = (35, 35, 37)       # 어두운 그레이/블랙 플립 카드 색상
    border_color = (25, 25, 27)     # 미세한 어두운 테두리
    border_width = max(1, int(size * 0.01))
    
    try:
        draw.rounded_rectangle(
            [margin, margin, size - margin, size - margin],
            radius=size * 0.12,
            fill=card_color,
            outline=border_color,
            width=border_width
        )
    except AttributeError:
        draw.rectangle(
            [margin, margin, size - margin, size - margin],
            fill=card_color,
            outline=border_color,
            width=border_width
        )
        
    # 3. 플립 카드 중간을 가로지르는 수평 분할 선 그리기
    divider_y = size / 2
    divider_width = max(2, int(size * 0.015))
    draw.line(
        [margin + border_width, divider_y, size - margin - border_width, divider_y],
        fill=(12, 12, 13),
        width=divider_width
    )
    
    # 4. 폰트 로드 ("07")
    font_num = get_font("arialbd.ttf", int(size * 0.60))
    
    # 5. 시간 "07" 텍스트 배치 (완벽한 정중앙 수학 공식 배치)
    bbox_num = get_text_bbox(draw, "07", font_num)
    x_num = size / 2 - (bbox_num[0] + bbox_num[2]) / 2
    y_num = size / 2 - (bbox_num[1] + bbox_num[3]) / 2
    
    draw.text((x_num, y_num), "07", fill=(255, 255, 255), font=font_num)
    
    return img

if __name__ == '__main__':
    print("새로운 플립 카드 스타일의 아이콘을 생성하는 중...")
    create_icon(192).save('icon-192.png', 'PNG')
    create_icon(512).save('icon-512.png', 'PNG')
    create_icon(180).save('apple-touch-icon.png', 'PNG')
    print("아이콘 생성이 성공적으로 완료되었습니다!")
