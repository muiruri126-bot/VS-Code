# COSME Project Backend

This is the backend server for the COSME Project, built with Node.js, Express, MongoDB, JWT authentication, and Nodemailer for email support.

## Features
- User authentication (JWT)
- REST API for indicators, actuals, and audit logs
- Email sending capability
- Production-ready structure

## Setup
1. Copy `.env.example` to `.env` and fill in your configuration.
2. Run `npm install` to install dependencies.
3. Start the server:
   - `npm run dev` (development, with nodemon)
   - `npm start` (production)

## Environment Variables
| Name | Required | Description | Example |
| --- | --- | --- | --- |
| `MONGODB_URI` | ✅ | MongoDB connection string | `mongodb://127.0.0.1:27017/benarddb` |
| `PORT` | ➖ | Port Express listens on (defaults to 5000) | `5000` |
| `FRONTEND_URL` | ✅ | Comma-separated list of allowed web origins for CORS | `http://localhost:5500` |
| `JWT_SECRET` | ✅ | Secret used to sign auth tokens | `super-secret` |
| `EMAIL_HOST` | ✅ | SMTP host for notifications | `smtp.mailtrap.io` |
| `EMAIL_PORT` | ✅ | SMTP port (usually 587) | `587` |
| `EMAIL_USER` | ✅ | SMTP username | `apikey` |
| `EMAIL_PASS` | ✅ | SMTP password/app password | `secret` |
| `EMAIL_FROM` | ✅ | Default From address | `noreply@cosme.local` |

## Frontend Integration
- Backend base URL: `http://localhost:5000` (or `http://<your-ip>:5000` for LAN testing).
- Set `FRONTEND_URL` in `.env` to the exact origin(s) your UI uses (e.g., `http://localhost:5500`). The custom CORS middleware will only allow those origins plus non-browser clients such as Postman.
- Every request from the frontend should include the `Authorization: Bearer <token>` header after login; protected routes will reject missing/invalid tokens.
- When deploying, update both `MONGODB_URI` and `FRONTEND_URL` to their production values and restart the server so the new settings take effect.

### Local Dashboard Hosting
1. `cd ../frontend`
2. `npm install` (first run only)
3. `npm start` → serves `Indicators_tracking_enhanced.html` at `http://localhost:5500`
4. Ensure the backend `.env` `FRONTEND_URL` includes `http://localhost:5500`, then restart the backend (`npm start` inside `backend/`).

Any edits to `Indicators_tracking_enhanced.html` are picked up automatically; refresh the browser to see changes.

## API Endpoints
| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| GET | `/` | None | Health check that returns `COSME Backend API running`. |
| POST | `/api/auth/register` | None | Create a new user (admin should call this to onboard accounts). |
| POST | `/api/auth/login` | None | Returns JWT token and user role. |
| GET | `/api/indicators` | User | List all indicators. |
| POST | `/api/indicators` | Admin | Create or update indicators by `id`. |
| POST | `/api/indicators/:id/actual` | User | Append an actual value to an indicator. |
| GET | `/api/actuals` | User | List actual records. |
| POST | `/api/actuals` | User | Create an actual record. |
| PUT | `/api/actuals/:id` | User | Update an actual record. |
| DELETE | `/api/actuals/:id` | Admin | Delete an actual record. |
| GET | `/api/audit` | User | Retrieve the latest 100 audit entries. |
| POST | `/api/audit` | User | Write an audit entry (auto-tags the authenticated user). |
| POST | `/api/email` | Admin | Send an email via the configured SMTP provider. |

## Requirements
- Node.js 18+
- MongoDB

## License
MIT
