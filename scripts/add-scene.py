#!/usr/bin/env python

import argparse
import shutil
import os
import re


def to_pascal_case(text):
    return "".join(word.capitalize() for word in text.replace("-", " ").replace("_", " ").split())


def to_camel_case(text):
    pascal = to_pascal_case(text)
    return pascal[0].lower() + pascal[1:]


def main():
    parser = argparse.ArgumentParser(description="Generate a new scene from a template.")
    parser.add_argument("name", help="The name of the new scene (e.g., 'battle-map')")
    args = parser.parse_args()

    new_scene_id = args.name
    pascal_name = to_pascal_case(new_scene_id)
    camel_name = to_camel_case(new_scene_id)
    
    src_path = "src/template-scene.ts"
    dest_path = f"src/{new_scene_id}.ts"
    html_path = "index.html"

    # 1. Copy and replace in the TS file
    if os.path.exists(src_path):
        shutil.copy(src_path, dest_path)
        with open(dest_path, "r") as f:
            content = f.read()
        
        content = content.replace("TemplateScene", pascal_name)
        
        with open(dest_path, "w") as f:
            f.write(content)
        print(f"Created: {dest_path}")
    else:
        print(f"Error: {src_path} not found.")
        return

    # 2. Modify index.html
    if os.path.exists(html_path):
        with open(html_path, "r") as f:
            lines = f.readlines()

        # Find last import line
        last_import_idx = -1
        # Find last scene registration line: ["name", new Class()],
        last_scene_idx = -1
        scene_pattern = re.compile(r'\[\s*".*?"\s*,\s*new\s+\w+\(\)\]\s*,')

        for i, line in enumerate(lines):
            if "import" in line:
                last_import_idx = i
            if scene_pattern.search(line):
                last_scene_idx = i

        # Insertions (starting from the bottom to not mess up indices)
        if last_scene_idx != -1:
            new_scene_line = f'              ["{camel_name}", new {pascal_name}()],\n'
            lines.insert(last_scene_idx + 1, new_scene_line)
        
        if last_import_idx != -1:
            # Re-calculating index because of previous insertion if it happened after
            if last_scene_idx != -1 and last_import_idx > last_scene_idx:
                 last_import_idx += 1
            
            import_line = f'    import {{{pascal_name}}} from "./src/{new_scene_id}.ts";\n'
            lines.insert(last_import_idx + 1, import_line)

        with open(html_path, "w") as f:
            f.writelines(lines)
        print(f"Updated: {html_path}")
    else:
        print(f"Error: {html_path} not found.")


if __name__ == "__main__":
    main()

