from flask import Flask, request, jsonify
import pyodbc
import random
import smtplib

app = Flask(__name__)

# Connection to SQL Server database
connection = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=DESKTOP-GDQ6SQO;'
    'DATABASE=medical;'
    'Trusted_Connection=yes;'
)

# Create cursor
cursor = connection.cursor()

# Email settings
EMAIL_ADDRESS = "rachel02439@gmail.com"
EMAIL_PASSWORD = "238238238"

# Dictionary to store verification codes
verification_codes = {}

# Function to send an email
def send_email(to, code):
    subject = "Your Verification Code"
    body = f"Your verification code is: {code}"
    message = f'Subject: {subject}\n\n{body}'

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.sendmail(EMAIL_ADDRESS, to, message)

@app.route('/check_user', methods=['GET'])
def check_user():
    identifier = request.args.get('identifier')  # Can be email
    query = "SELECT COUNT(*) FROM Users WHERE Email = ?"
    cursor.execute(query, (identifier,))
    count = cursor.fetchone()[0]

    if count > 0:
        # Send verification code
        verification_code = random.randint(100000, 999999)
        #send_email(identifier, verification_code)

        # Store the verification code for this identifier
        verification_codes[identifier] = verification_code

        return jsonify({'message': 'Verification code sent!'}), 200
    else:
        return jsonify({'message': 'User not found!'}), 404

@app.route('/verify_code', methods=['POST'])
def verify_code():
    data = request.json
    identifier = data.get('identifier')  # Email
    user_code = data.get('code')  # Verification code provided by the user

    # Check if the code exists and matches
    if identifier in verification_codes and verification_codes[identifier] == user_code:
        # Code is correct
        return jsonify({'message': 'Verification successful!'}), 200
    else:
        return jsonify({'message': 'Invalid verification code!'}), 400

@app.route('/add_user', methods=['GET', 'POST'])
def add_user():
    if request.method == 'GET':
        # Get parameters from the URL
        first_name = request.args.get('FirstName')
        last_name = request.args.get('LastName')
        id_value = request.args.get('Id')  # Changed from IDCard to Id
        treatment_date = request.args.get('TreatmentDate')
        treatment_location = request.args.get('TreatmentLocation')
        medical_institution = request.args.get('MedicalInstitution')
        phone = request.args.get('Phone')
        email = request.args.get('Email')
    else:
        # Get JSON data from the request body
        data = request.json
        first_name = data.get('FirstName')
        last_name = data.get('LastName')
        id_value = data.get('Id')  # Changed from IDCard to Id
        treatment_date = data.get('TreatmentDate')
        treatment_location = data.get('TreatmentLocation')
        medical_institution = data.get('MedicalInstitution')
        phone = data.get('Phone')
        email = data.get('Email')

    # Check if email or phone already exists
    query = "SELECT COUNT(*) FROM Users WHERE Email = ? OR Phone = ?"
    cursor.execute(query, (email, phone))
    count = cursor.fetchone()[0]

    if count > 0:
        return jsonify({'message': 'Email or phone already exists!'}), 400

    # Insert new user
    insert_query = '''
    INSERT INTO Users (FirstName, LastName, Id, TreatmentDate, TreatmentLocation, MedicalInstitution, Phone, Email)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    '''
    cursor.execute(insert_query, (
        first_name, last_name, id_value, treatment_date, treatment_location, medical_institution, phone, email))
    connection.commit()

    return jsonify({'message': 'User added successfully!'}), 201


@app.route('/insert_information', methods=['GET', 'PUT'])
def insert_information():
    if request.method == 'GET':
        # Extract data from URL parameters
        identifier = request.args.get('identifier')  # Email or phone (unique identifier for the user)
        first_name = request.args.get('FirstName')  # New first name
        last_name = request.args.get('LastName')  # New last name
        id_value = request.args.get('Id')  # Changed from IDCard to Id
        treatment_date = request.args.get('TreatmentDate')  # New treatment date
        treatment_location = request.args.get('TreatmentLocation')  # New treatment location
        medical_institution = request.args.get('MedicalInstitution')  # New medical institution name
    else:
        # Extract JSON data from the request
        data = request.json
        identifier = data.get('identifier')  # Email or phone (unique identifier for the user)
        first_name = data.get('FirstName')  # New first name
        last_name = data.get('LastName')  # New last name
        id_value = data.get('Id')  # Changed from IDCard to Id
        treatment_date = data.get('TreatmentDate')  # New treatment date
        treatment_location = data.get('TreatmentLocation')  # New treatment location
        medical_institution = data.get('MedicalInstitution')  # New medical institution name

    # Check if a user with the given email or phone exists in the database
    query = "SELECT COUNT(*) FROM Users WHERE Email = ? OR Phone = ?"
    cursor.execute(query, (identifier, identifier))
    count = cursor.fetchone()[0]

    # If no user is found, return a 404 status with an error message
    if count == 0:
        return jsonify({'message': 'User not found!'}), 404

    # Update the user details if they exist
    update_query = '''
    UPDATE Users
    SET FirstName = ?, LastName = ?, Id = ?, TreatmentDate = ?, TreatmentLocation = ?, MedicalInstitution = ?
    WHERE Email = ? OR Phone = ?
    '''
    cursor.execute(update_query, (
        first_name, last_name, id_value, treatment_date, treatment_location, medical_institution, identifier, identifier))

    # Commit the transaction to save the changes
    connection.commit()

    # Return a success message after the update
    return jsonify({'message': 'User details updated successfully!'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

