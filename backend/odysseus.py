from jinja2 import Template
from weasyprint import HTML
from content_generation import generate_handbook_content

# Inputs
season = "Summer"
location = "Glacier Bay National Park, Alaska"
days = 3
group_size = 4

# # Step 1: Classify environment type
# environment = classify_environment(location)

# Step 2: Load template based on environment
template_path = r"C:\Users\joelg\OneDrive\Desktop\HackPSU\backend\trip-buddy\handbook_template.html"
with open(template_path, "r", encoding="utf-8") as file:
    template_html = file.read()

# Step 3: Generate content using OpenAI
content = generate_handbook_content(season, location, days, group_size)

# Step 4: Render
template = Template(template_html)
rendered_html = template.render(
    location=location,
    season=season,
    days=days,
    number_of_people=group_size,
    **content
)

# Step 5: Output PDF
output_path = r"C:\Users\joelg\OneDrive\Desktop\HackPSU\backend\trip-buddy\Trip_handbook.pdf"
HTML(string=rendered_html).write_pdf(output_path)
print(f"Handbook PDF generated!")