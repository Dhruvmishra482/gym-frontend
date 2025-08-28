import axiosInstance from "../../axiosConfig";

// Validation function for member data
export const validateMemberData = (formData) =>
{
  const errors = [];

  // Required fields validation
  if (!formData.name || formData.name.trim() === "")
  {
    errors.push("Name is required");
  }

  if (!formData.phoneNo || formData.phoneNo.trim() === "")
  {
    errors.push("Phone number is required");
  } else if (!/^\d{10}$/.test(formData.phoneNo.replace(/\D/g,'')))
  {
    errors.push("Phone number must be 10 digits");
  }

  if (!formData.feesAmount || formData.feesAmount.trim() === "")
  {
    errors.push("Fees amount is required");
  } else if (isNaN(formData.feesAmount) || parseFloat(formData.feesAmount) <= 0)
  {
    errors.push("Fees amount must be a valid positive number");
  }

  if (!formData.nextDueDate || formData.nextDueDate.trim() === "")
  {
    errors.push("Next due date is required");
  }

  if (!formData.address || formData.address.trim() === "")
  {
    errors.push("Address is required");
  }

  // Email validation (if provided)
  if (formData.email && formData.email.trim() !== "")
  {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
    {
      errors.push("Please enter a valid email address");
    }
  }

  // Age validation (if provided)
  if (formData.age && formData.age.trim() !== "")
  {
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 12 || age > 100)
    {
      errors.push("Age must be between 12 and 100");
    }
  }

  // Date validation
  if (formData.nextDueDate)
  {
    const nextDueDate = new Date(formData.nextDueDate);
    const today = new Date();
    today.setHours(0,0,0,0);

    if (nextDueDate < today)
    {
      errors.push("Next due date cannot be in the past");
    }
  }

  if (formData.lastPaidOn && formData.lastPaidOn.trim() !== "")
  {
    const lastPaidDate = new Date(formData.lastPaidOn);
    const today = new Date();

    if (lastPaidDate > today)
    {
      errors.push("Last paid date cannot be in the future");
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Search member by name or phone - NEW FUNCTION
export const searchMember = async (query) =>
{
  try
  {
    // First, get all members and search locally since backend doesn't have search endpoint
    const allMembersResponse = await getAllMembers();

    if (!allMembersResponse.success)
    {
      return allMembersResponse;
    }

    const members = allMembersResponse.data;
    const cleanQuery = query.trim().toLowerCase();
    const phoneQuery = query.replace(/\D/g,'');

    // Search by name or phone
    const foundMember = members.find(member =>
      member.name.toLowerCase().includes(cleanQuery) ||
      member.phoneNo.includes(phoneQuery)
    );

    if (foundMember)
    {
      return {
        success: true,
        message: "Member found successfully",
        data: foundMember
      };
    } else
    {
      return {
        success: false,
        message: "No member found with that name or phone number"
      };
    }
  } catch (error)
  {
    console.error("Search member error:",error);
    return {
      success: false,
      message: "An error occurred while searching for the member"
    };
  }
};

// Add new member
export const addMember = async (memberData) =>
{
  try
  {
    const response = await axiosInstance.post("/member/addmember",memberData);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data
    };
  } catch (error)
  {
    console.error("Add member error:",error);

    if (error.response)
    {
      // Server responded with error status
      const { status,data } = error.response;

      if (status === 409)
      {
        return {
          success: false,
          message: "Member with this phone number already exists"
        };
      }

      if (status === 400)
      {
        // Validation errors from backend
        const validationErrors = data.errors ?
          data.errors.map(err => err.msg || err.message).join(", ") :
          data.message;

        return {
          success: false,
          message: validationErrors || "Invalid data provided"
        };
      }

      if (status === 401)
      {
        return {
          success: false,
          message: "Authentication failed. Please login again."
        };
      }

      if (status === 403)
      {
        return {
          success: false,
          message: "Access denied. Only gym owners can add members."
        };
      }

      return {
        success: false,
        message: data.message || "Failed to add member"
      };
    }

    if (error.request)
    {
      // Network error
      return {
        success: false,
        message: "Network error. Please check your connection and try again."
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again."
    };
  }
};

// Edit member
export const editMember = async (phoneNo,updateData) =>
{
  try
  {
    const response = await axiosInstance.patch(`/member/editmember/${phoneNo}`,updateData);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data
    };
  } catch (error)
  {
    console.error("Edit member error:",error);

    if (error.response)
    {
      const { status,data } = error.response;

      if (status === 404)
      {
        return {
          success: false,
          message: "Member not found with this phone number"
        };
      }

      if (status === 400)
      {
        return {
          success: false,
          message: data.message || "Invalid update data"
        };
      }

      if (status === 401)
      {
        return {
          success: false,
          message: "Authentication failed. Please login again."
        };
      }

      if (status === 403)
      {
        return {
          success: false,
          message: "Access denied. Only gym owners can edit members."
        };
      }

      return {
        success: false,
        message: data.message || "Failed to update member"
      };
    }

    if (error.request)
    {
      return {
        success: false,
        message: "Network error. Please check your connection and try again."
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again."
    };
  }
};

// Delete member
export const deleteMember = async (phoneNo) =>
{
  try
  {
    const response = await axiosInstance.delete(`/member/deletemember/${phoneNo}`);
    return {
      success: true,
      message: response.data.message,
      data: response.data.data
    };
  } catch (error)
  {
    console.error("Delete member error:",error);

    if (error.response)
    {
      const { status,data } = error.response;

      if (status === 404)
      {
        return {
          success: false,
          message: "Member not found with this phone number"
        };
      }

      if (status === 401)
      {
        return {
          success: false,
          message: "Authentication failed. Please login again."
        };
      }

      if (status === 403)
      {
        return {
          success: false,
          message: "Access denied. Only gym owners can delete members."
        };
      }

      return {
        success: false,
        message: data.message || "Failed to delete member"
      };
    }

    if (error.request)
    {
      return {
        success: false,
        message: "Network error. Please check your connection and try again."
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again."
    };
  }
};

// Get all members (if needed for listing)
export const getAllMembers = async () =>
{
  try
  {
    const response = await axiosInstance.get("/member/allmembers");
    return {
      success: true,
      data: response.data.data
    };
  } catch (error)
  {
    console.error("Get all members error:",error);

    if (error.response)
    {
      const { status,data } = error.response;

      if (status === 401)
      {
        return {
          success: false,
          message: "Authentication failed. Please login again."
        };
      }

      return {
        success: false,
        message: data.message || "Failed to fetch members"
      };
    }

    if (error.request)
    {
      return {
        success: false,
        message: "Network error. Please check your connection and try again."
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again."
    };
  }
};

// Get member by phone number (if needed)
export const getMemberByPhone = async (phoneNo) =>
{
  try
  {
    const response = await axiosInstance.get(`/member/getmember/${phoneNo}`);
    return {
      success: true,
      data: response.data.data
    };
  } catch (error)
  {
    console.error("Get member error:",error);

    if (error.response)
    {
      const { status,data } = error.response;

      if (status === 404)
      {
        return {
          success: false,
          message: "Member not found with this phone number"
        };
      }

      if (status === 401)
      {
        return {
          success: false,
          message: "Authentication failed. Please login again."
        };
      }

      return {
        success: false,
        message: data.message || "Failed to fetch member"
      };
    }

    if (error.request)
    {
      return {
        success: false,
        message: "Network error. Please check your connection and try again."
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again."
    };
  }
};