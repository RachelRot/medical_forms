import pyodbc

# Connect to the SQL Server database
connection = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=DESKTOP-GDQ6SQO;'
    'DATABASE=medical;'
    'Trusted_Connection=yes;'
)

# Create a cursor to execute queries
cursor = connection.cursor()

# Create a new table if it does not exist
create_table_query = '''
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
BEGIN
    CREATE TABLE Users (
        IDkey INT IDENTITY(1,1) PRIMARY KEY,
        FirstName NVARCHAR(50),
        LastName NVARCHAR(50),
        Id NVARCHAR(9),
        TreatmentDate DATE,
        TreatmentLocation NVARCHAR(100),
        MedicalInstitution NVARCHAR(100),
        Phone NVARCHAR(11),
        Email NVARCHAR(100)
    );
END
'''

cursor.execute(create_table_query)
connection.commit()  # Save the changes

# SQL query to check the structure of the table
check_columns_query = '''
SELECT COLUMN_NAME, DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'Users';
'''

cursor.execute(check_columns_query)
columns = cursor.fetchall()

print("Structure of the 'Users' table:")
for column in columns:
    print(f"Column: {column.COLUMN_NAME}, Data Type: {column.DATA_TYPE}")

# Close the connection
connection.close()
