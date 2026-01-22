import type { Blog } from "../types/Blog";

const BASE_URL = "http://localhost:8000";

//helper check respons
const checkResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || "Request failed")
  }

  return response.json()
};


export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await fetch(`${BASE_URL}/blogs`)
    return await checkResponse<Blog[]>(response)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    throw new Error("Failed to fetch blogs")
  }
};

//fetch create blog
export const createBlog = async (blog:Blog):Promise<void> => {
    try {
    const response = await fetch(`${BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
    await checkResponse(response)
        
    } catch (error:any) {
        console.error(error)
        throw new Error (error.message || 'Failed to create Blog')
    }
}

// Fetch single blog (terima optional RequestInit => bisa pakai signal)
export const fetchBlog = async (id: string, options?: RequestInit): Promise<Blog> => {
  try {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, { ...options });
    if (response.status === 404) {
      throw new Error("Blog tidak ditemukan (404)");
    }
    return await checkResponse<Blog>(response);
  } catch (error: any) {
    console.error("Error in fetchBlog:", error);
    throw new Error(error.message || "Failed to fetch blog");
  }
};


//delete blog by id
export const deleteBlog = async(id:string):Promise<void> =>{
  try {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: 'DELETE'}
    );
    await checkResponse(response)
  } catch (error:any) {
    console.error(error)
    throw new Error(error.message || "Failed to delete Resouece");
  }

}


//fetch buat updateblog
export const updateBlog = async (id:string, blog:Blog):Promise<void> => {
    try {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
    await checkResponse(response)
        
    } catch (error:any) {
        console.error(error)
        throw new Error (error.message || 'Failed to update Blog')
    }
}