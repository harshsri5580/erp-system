"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      if (response.data.success) {

        localStorage.setItem(
          "userRole",
          response.data.user.role
        );

        localStorage.setItem(
          "userName",
          response.data.user.name
        );

        window.location.href =
          "/dashboard";

      } else {

        alert("Invalid login");

      }

    } catch (error) {

      console.log(error);

      alert("Login failed");

    }

  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-4">

          <div className="card shadow">

            <div className="card-body">

              <h2 className="mb-4 text-center">
                ERP Login
              </h2>

              <form onSubmit={handleLogin}>

                <div className="mb-3">

                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                </div>

                <div className="mb-3">

                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100"
                >
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}