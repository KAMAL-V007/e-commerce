# Brew and Blooom

Brew and Blooom is a full-stack e-commerce web application with a comprehensive cloud-ready infrastructure, built using vanilla web technologies, Node.js, and PostgreSQL. It features robust monitoring, containerization, and Infrastructure as Code (IaC) for automated AWS deployment.

## Architecture & Tech Stack

### Frontend

* **Tech**: HTML5, CSS3, Vanilla JavaScript
* **Server**: NGINX (serving static files and acting as a reverse proxy)
* **Features**: Dynamic UI components, authentication forms, shopping cart management, product catalog.

### Backend

* **Tech**: Node.js, Express.js
* **Database**: PostgreSQL 15 (initialized automatically via `schema.sql`)
* **Security**: JWT-based Authentication, bcrypt for password hashing
* **Features**: RESTful API for products, authentication, and cart management.

### DevOps & Infrastructure

* **Containerization**: Docker & Docker Compose
* **Infrastructure as Code**: Terraform (AWS VPC, EC2, Security Groups, EIP)
* **Monitoring Stack**: Prometheus, Grafana, Node Exporter, cAdvisor
* **SSL/TLS**: Certbot (Let's Encrypt) integration for secure HTTPS traffic.

---

## Getting Started Locally (Development Mode)

Follow these steps to run the application locally on the `dev` branch.

### Prerequisites

* [Docker](https://docs.docker.com/get-docker/) & Docker Compose installed
* [Git](https://git-scm.com/) installed
* [Node.js](https://nodejs.org/) installed (for local backend development without Docker, optional)

### Steps

1. **Clone the repository and switch to the dev branch:**

   ```bash
   git clone https://github.com/kamal-v8/e-commerce.git
   cd e-commerce/brew-and-blooom
   git checkout dev
   ```

   *(If you already have the repository locally, just ensure you are on the `dev` branch by running `git checkout dev`)*

2. **Configure Environment Variables:**
   Copy the `.env-clue` file to create your own `.env` file in the root directory:

   ```bash
   cp .env-clue .env
   ```

   *Edit `.env` and provide the required values (e.g., `DB_USER=postgres`, `DB_PASSWORD=mysecret`, `DB_NAME=coffeedb`, `JWT_SECRET=supersecret`).*

   Create a `.env` in the `backend` directory as well:

   ```bash
   cp .env-clue backend/.env
   ```

   *(Ensure it has `DB_HOST=db` and `PORT=3000` alongside the DB credentials).*

3. **Start the application with Docker Compose:**

   ```bash
   docker compose up -d
   ```

   This will spin up the following containers:
   * **Frontend (NGINX)** on ports `80` & `443`
   * **Node.js Backend** on port `3000` (runs with `nodemon` for hot-reloading code changes)
   * **PostgreSQL Database** mapped to port `5433` (internally `5432`)
   * **Monitoring Suite:** Prometheus (`9000`), Grafana (`4000`), cAdvisor (`8080`), Node Exporter (`9100`)

4. **Access the application:**
   * **Frontend:** `http://localhost`
   * **Backend API:** `http://localhost:3000`
   * **Grafana Dashboard:** `http://localhost:4000`

---

## Deploying to the Cloud (AWS)

The project includes Terraform configurations to automatically provision infrastructure on AWS and deploy the application.

### Prerequisites

* [AWS CLI](https://aws.amazon.com/cli/) configured with valid credentials
* [Terraform](https://developer.hashicorp.com/terraform/downloads) installed
* An SSH key pair generated (the script expects a public key at `~/.ssh/ec2-key.pub`).

### Steps

1. **Navigate to the Terraform directory:**

   ```bash
   cd terraform
   ```

2. **Initialize Terraform:**
   This step prepares the working directory and downloads the necessary AWS provider plugins.

   ```bash
   terraform init
   ```

3. **Review the deployment plan:**
   Check what resources will be created before applying.

   ```bash
   terraform plan
   ```

4. **Apply the configuration:**
   Deploy the infrastructure to AWS. You will be prompted to type `yes` to confirm the action.

   ```bash
   terraform apply
   ```

**What happens during deployment?**
Terraform creates a secure baseline including a VPC, public subnet, Internet Gateway, Security Groups, and an EC2 instance (Ubuntu 24.04). Using an automated `user_data` script, the instance will:

1. Install Docker, Git, and other dependencies.
2. Clone the repository from GitHub.
3. Automatically configure production `.env` files.
4. Launch the entire full-stack and monitoring application using `docker compose up -d`.

**To access the cloud app:**
Retrieve the associated Elastic IP from the AWS console (or Terraform outputs) and visit `http://<Elastic-IP>`.

---

## Monitoring & Observability

The project is built with observability in mind. Once deployed (either locally or in the cloud), you can access **Grafana** (on Port `4000`). It is pre-configured with a **Prometheus** (Port `9000`) data source to visualize hardware and container metrics collected seamlessly by **cAdvisor** and **Node Exporter**.
