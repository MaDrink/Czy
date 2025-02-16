import os
import json
from datetime import datetime
import tkinter as tk
from tkinter import filedialog

def generate_photos_json():
    # 创建一个根窗口但不显示
    root = tk.Tk()
    root.withdraw()

    # 打开文件夹选择对话框
    folder_path = filedialog.askdirectory(title="选择图片文件夹")
    
    if not folder_path:
        print("没有选择文件夹")
        return

    # 支持的图片格式
    image_extensions = ('.jpg', '.jpeg', '.png', '.gif', '.webp')
    
   

    # 创建HTML格式的图片列表
    photo_html = []
    
    # 遍历文件夹
    for filename in os.listdir(folder_path):
        if filename.lower().endswith(image_extensions):
            # 获取文件的完整路径
            file_path = os.path.join(folder_path, filename)
            # 获取文件的修改时间
            mod_time = os.path.getmtime(file_path)
            mod_date = datetime.fromtimestamp(mod_time).strftime('%Y-%m-%d')
            
            # 创建HTML格式的图片元素
            photo_html_item = f'''            <div class="photo-item">
                <img src="arrive/{filename}" alt="null">
            </div>'''
            
            photo_html.append(photo_html_item)
    
    # 按日期排序（如果需要）
    # photos.sort(key=lambda x: x['date'], reverse=True)
    
    # 将所有HTML元素连接成一个字符串
    html_content = "\n".join(photo_html)
    
    # 保存HTML内容到文件
    output_file_path = os.path.join(folder_path, 'photos.html')
    
    try:
        with open(output_file_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"成功生成 photos.html 文件！")
        print(f"共处理了 {len(photo_html)} 张图片")
        print(f"文件保存在: {output_file_path}")
    except Exception as e:
        print(f"生成文件时出错: {str(e)}")

if __name__ == "__main__":
    generate_photos_json() 