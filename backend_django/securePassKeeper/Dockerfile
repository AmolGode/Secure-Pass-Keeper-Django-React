# Use an official Python runtime as a parent image
FROM python:3.8

# Set the working directory to /backend
WORKDIR /backend

# Copy the current directory contents into the container at /backend

COPY . /backend

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000


# Start the application with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "securePassKeeper.wsgi:application"]