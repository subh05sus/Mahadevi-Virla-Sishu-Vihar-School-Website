/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  UserType,
} from "../../backend/src/shared/types";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};



export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return response.json();
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};



export const createBlog = async (destinationFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/blogs`, {
    method: "POST",
    credentials: "include",
    body: destinationFormData,
  });
  if (!response.ok) {
    throw new Error("Failed to add blog");
  }

  return response.json();
};

export const getAllBlogs = async () => {
  const response = await fetch(`${API_BASE_URL}/api/blogs`);
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return response.json();
};

export const getBlogById = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch blog details");
  }
  return response.json();
};

export const searchBlogs = async (searchTerm: string) => {
  const response = await fetch(
    `${API_BASE_URL}/api/blogs?searchTerm=${searchTerm}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to search blogs");
  }
  return response.json();
};

export const deleteBlog = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to delete blog");
  }
};

export const uploadCarouselImage = async (carouselFormData: FormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/carousel`, {
      method: "POST",
      credentials: "include",
      body: carouselFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload carousel image");
    }

    return await response.json();
  } catch (error) {
    console.error("Error uploading carousel image:", error);
    throw error;
  }
};

export const fetchCarouselImages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/carousel`);

    if (!response.ok) {
      throw new Error("Failed to fetch carousel images");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching carousel images:", error);
    throw error;
  }
};

export const deleteCarouselImage = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/carousel/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete carousel image");
    }
  } catch (error) {
    console.error("Error deleting carousel image:", error);
    throw error;
  }
};



export const createNotice = async (noticeData: { title: string; date: string; content: string }) => {
  const response = await fetch(`${API_BASE_URL}/api/notices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(noticeData),
  });
  if (!response.ok) {
    throw new Error("Failed to add notice");
  }

  return response.json();
};

export const getAllNotices = async () => {
  const response = await fetch(`${API_BASE_URL}/api/notices`);
  if (!response.ok) {
    throw new Error("Failed to fetch notices");
  }

  return response.json();
};

export const getNoticeById = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/notices/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch notice details");
  }
  return response.json();
};

export const deleteNotice = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/notices/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to delete notice");
  }
};



export const createHighlight = async (highlightFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/highlights`, {
    method: "POST",
    credentials: "include",
    body: highlightFormData,
  });
  if (!response.ok) {
    throw new Error("Failed to add highlight");
  }

  return response.json();
};

export const getAllHighlights = async () => {
  const response = await fetch(`${API_BASE_URL}/api/highlights`);
  if (!response.ok) {
    throw new Error("Failed to fetch highlights");
  }

  return response.json();
};



export const getHighlightById = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/highlights/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch highlight details");
  }
  return response.json();
};


export const deleteHighlight = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/api/highlights/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to delete highlight");
  }
};
