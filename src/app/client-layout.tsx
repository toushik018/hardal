"use client";

import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, clearToken } from "@/redux/slices/sessionSlice";
import { showLoading, hideLoading } from "@/redux/slices/loadingSlice";

const api = axios.create({
  withCredentials: true,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showLoading());

    const fetchSessionData = async () => {
      try {
        const res = await api.get("/api/check-session");
        const { sessionData } = res.data;
        
        if (sessionData && sessionData.api_token) {
          dispatch(setToken(sessionData.api_token));
        } else {
          dispatch(clearToken());
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
        dispatch(clearToken());
      } finally {
        dispatch(hideLoading());
      }
    };

    fetchSessionData();
  }, [dispatch]);

  return <>{children}</>;
}
