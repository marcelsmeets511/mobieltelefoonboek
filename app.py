# NummerZoeken V3.0
# Created by Wo0ozer
# building the impossible since 2001

import os
from flask import Flask, render_template, request, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Database connection parameters
DB_HOST = os.getenv('DB_HOST', 'aws-0-eu-central-1.pooler.supabase.com')
DB_PORT = os.getenv('DB_PORT', '6543')
DB_NAME = os.getenv('DB_NAME', 'postgres')
DB_USER = os.getenv('DB_USER', 'postgres.ddetnuvbypskrdvtkxfy')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'Witches3255')

def get_db_connection():
    """Create a database connection"""
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn

@app.route('/')
def index():
    """Render the main page with the search form"""
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    """Handle search requests and return results as JSON"""
    # Get search parameters from form
    telefoonnummer = request.form.get('telefoonnummer', '')
    facebookid = request.form.get('facebookid', '')
    voornaam = request.form.get('voornaam', '')
    achternaam = request.form.get('achternaam', '')
    geslacht = request.form.get('geslacht', '')
    plaatsnaam = request.form.get('plaatsnaam', '')
    land = request.form.get('land', '')
    status = request.form.get('status', '')
    bedrijfsnaam = request.form.get('bedrijfsnaam', '')h
    # Build the SQL query dynamically
    query = "SELECT * FROM profiles WHERE 1=1"
    params = []

    if telefoonnummer:
        query += " AND telefoonnummer ILIKE %s"
        params.append(f"%{telefoonnummer}%")
    if facebookid:
        query += " AND facebookid ILIKE %s"
        params.append(f"%{facebookid}%")
    if voornaam:
        query += " AND voornaam ILIKE %s"
        params.append(f"%{voornaam}%")
    if achternaam:
        query += " AND achternaam ILIKE %s"
        params.append(f"%{achternaam}%")
    if geslacht:
        query += " AND geslacht ILIKE %s"
        params.append(f"%{geslacht}%")
    if plaatsnaam:
        query += " AND (plaatsnaam ILIKE %s OR geboorteplaats ILIKE %s)"
        params.append(f"%{plaatsnaam}%")
        params.append(f"%{plaatsnaam}%")
    if land:
        query += " AND land ILIKE %s"
        params.append(f"%{land}%")
    if status:
        query += " AND status ILIKE %s"
        params.append(f"%{status}%")
    if bedrijfsnaam:
        query += " AND bedrijfsnaam ILIKE %s"
        params.append(f"%{bedrijfsnaam}%")

    # Add limit to prevent overwhelming results (since there are 5M+ records)
    #query += " LIMIT 100"

    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute(query, params)
        results = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify({"success": True, "data": results})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 8080)), debug=False)
