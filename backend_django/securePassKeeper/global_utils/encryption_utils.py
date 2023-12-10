from cryptography.fernet import Fernet

def encrypt(password, key):
    try:
        cipher_suite = Fernet(key)
        encrypted_password = cipher_suite.encrypt(password.encode())
        return encrypted_password
    except Exception as e:
        return ''

def decrypt(encrypted_password, key):
    try:
        cipher_suite = Fernet(key)
        decrypted_password = cipher_suite.decrypt(encrypted_password)
        return decrypted_password.decode('utf-8')
    except Exception as e:
        return ''

# # Example usage:
# Replace 'encryption_key' with the key derived using PBKDF2
# encryption_key = b'edfd9Dlmh2Srk7-U_i6UufNmytlJr6ECsjOVAIAuTbQ='
# user_password = "pass@1234"

# # Encrypt the password
# encrypted_password = encrypt(user_password, encryption_key)
# print("Encrypted Password:", encrypted_password)

# # Decrypt the password
# decrypted_password = decrypt(encrypted_password, encryption_key)
# print("Decrypted Password:", decrypted_password)
