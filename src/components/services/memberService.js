// memberService.js - API service for member management

// Enhanced API URL configuration with better debugging
const getApiBaseUrl = () =>
{
    let baseUrl;

    try
    {
        // Check for environment variable first
        if (typeof process !== 'undefined' && process.env?.REACT_APP_API_URL)
        {
            baseUrl = process.env.REACT_APP_API_URL;
            console.log('Using environment API URL:',baseUrl);
        } else
        {
            // Development fallback
            baseUrl = 'http://localhost:5000/api/v1/member';
            console.log('Using default API URL:',baseUrl);
        }
    } catch (error)
    {
        baseUrl = 'http://localhost:5000/api/v1/member';
        console.log('Error reading environment, using fallback URL:',baseUrl);
    }

    return baseUrl;
};

const API_BASE_URL = getApiBaseUrl();

// Enhanced headers function with debugging
const getHeaders = () =>
{
    const headers = {
        'Content-Type': 'application/json',
    };
    console.log('Request headers:',headers);
    return headers;
};

// Test API connectivity function
export const testConnection = async () =>
{
    try
    {
        console.log('Testing API connectivity...');
        const testUrl = `${API_BASE_URL}/members`;
        console.log('Test URL:',testUrl);

        const response = await fetch(testUrl,{
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include',
        });

        console.log('Test response status:',response.status);
        console.log('Test response headers:',Object.fromEntries(response.headers.entries()));

        if (response.ok)
        {
            console.log('✅ API connection successful');
            return { success: true,message: 'API connection successful' };
        } else
        {
            console.log('❌ API connection failed with status:',response.status);
            return { success: false,message: `API returned status ${response.status}` };
        }
    } catch (error)
    {
        console.error('❌ API connection test failed:',error);
        return { success: false,message: error.message };
    }
};

// Enhanced Add Member API call with detailed logging
export const addMember = async (memberData) =>
{
    try
    {
        console.log('=== ADD MEMBER REQUEST ===');
        console.log('Member data:',JSON.stringify(memberData,null,2));

        const apiUrl = `${API_BASE_URL}/addmember`;
        console.log('API URL:',apiUrl);

        const requestConfig = {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include',
            body: JSON.stringify(memberData),
        };

        console.log('Request config:',{
            method: requestConfig.method,
            headers: requestConfig.headers,
            credentials: requestConfig.credentials,
            bodyLength: requestConfig.body.length
        });

        console.log('Sending fetch request...');
        const response = await fetch(apiUrl,requestConfig);

        console.log('=== RESPONSE RECEIVED ===');
        console.log('Response status:',response.status);
        console.log('Response status text:',response.statusText);
        console.log('Response headers:',Object.fromEntries(response.headers.entries()));
        console.log('Response URL:',response.url);
        console.log('Response type:',response.type);

        if (!response.ok)
        {
            let errorText;
            try
            {
                errorText = await response.text();
                console.error('Error response body:',errorText);
            } catch (textError)
            {
                console.error('Could not read error response:',textError);
                errorText = `HTTP ${response.status} ${response.statusText}`;
            }

            throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        let data;
        try
        {
            data = await response.json();
            console.log('Success response data:',JSON.stringify(data,null,2));
        } catch (jsonError)
        {
            console.error('Failed to parse JSON response:',jsonError);
            throw new Error('Invalid JSON response from server');
        }

        console.log('✅ Member added successfully');
        return {
            success: true,
            data: data.data,
            message: data.message || 'Member added successfully',
        };

    } catch (error)
    {
        console.error('=== ADD MEMBER ERROR ===');
        console.error('Error name:',error.name);
        console.error('Error message:',error.message);
        console.error('Error stack:',error.stack);

        // Enhanced error categorization
        let errorMessage = 'Failed to add member. Please try again.';
        let errorCategory = 'unknown';

        if (error.name === 'TypeError' && error.message.includes('Failed to fetch'))
        {
            errorCategory = 'connection';
            errorMessage = 'Cannot connect to server. Please check:\n' +
                '• Backend server is running on port 5000\n' +
                '• CORS is properly configured\n' +
                '• No firewall blocking the connection';
        } else if (error.name === 'TypeError' && error.message.includes('NetworkError'))
        {
            errorCategory = 'network';
            errorMessage = 'Network error occurred. Check your internet connection.';
        } else if (error.message.includes('CORS'))
        {
            errorCategory = 'cors';
            errorMessage = 'CORS error: Backend needs to allow requests from this domain.';
        } else if (error.message.includes('404'))
        {
            errorCategory = 'endpoint';
            errorMessage = 'API endpoint not found. Check if the backend route exists.';
        } else if (error.message.includes('500'))
        {
            errorCategory = 'server';
            errorMessage = 'Server error occurred. Check backend logs.';
        } else if (error.message)
        {
            errorMessage = error.message;
        }

        console.log('Error category:',errorCategory);
        console.log('Final error message:',errorMessage);

        return {
            success: false,
            message: errorMessage,
            errorCategory: errorCategory,
            originalError: error.message
        };
    }
};

// Enhanced Edit Member API call
export const editMember = async (phoneNo,updateData) =>
{
    try
    {
        console.log('=== EDIT MEMBER REQUEST ===');
        console.log('Phone:',phoneNo);
        console.log('Update data:',JSON.stringify(updateData,null,2));

        const apiUrl = `${API_BASE_URL}/editmember/${phoneNo}`;
        console.log('API URL:',apiUrl);

        const response = await fetch(apiUrl,{
            method: 'PATCH',
            headers: getHeaders(),
            credentials: 'include',
            body: JSON.stringify(updateData),
        });

        console.log('Response status:',response.status);

        let data;
        try
        {
            data = await response.json();
        } catch (jsonError)
        {
            throw new Error('Invalid JSON response from server');
        }

        if (!response.ok)
        {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        console.log('✅ Member updated successfully');
        return {
            success: true,
            data: data.data,
            message: data.message || 'Member updated successfully',
        };
    } catch (error)
    {
        console.error('Edit Member API Error:',error);

        let errorMessage = 'Failed to update member. Please try again.';
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch'))
        {
            errorMessage = 'Cannot connect to server. Please check if the server is running.';
        } else if (error.message)
        {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }
};

// Enhanced Delete Member API call
export const deleteMember = async (phoneNo) =>
{
    try
    {
        console.log('=== DELETE MEMBER REQUEST ===');
        console.log('Phone:',phoneNo);

        const apiUrl = `${API_BASE_URL}/deletemember/${phoneNo}`;
        console.log('API URL:',apiUrl);

        const response = await fetch(apiUrl,{
            method: 'DELETE',
            headers: getHeaders(),
            credentials: 'include',
        });

        console.log('Response status:',response.status);

        let data;
        try
        {
            data = await response.json();
        } catch (jsonError)
        {
            throw new Error('Invalid JSON response from server');
        }

        if (!response.ok)
        {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        console.log('✅ Member deleted successfully');
        return {
            success: true,
            data: data.data,
            message: data.message || 'Member deleted successfully',
        };
    } catch (error)
    {
        console.error('Delete Member API Error:',error);

        let errorMessage = 'Failed to delete member. Please try again.';
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch'))
        {
            errorMessage = 'Cannot connect to server. Please check if the server is running.';
        } else if (error.message)
        {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }
};

// Enhanced Get all members
export const getAllMembers = async () =>
{
    try
    {
        console.log('=== GET ALL MEMBERS REQUEST ===');

        const apiUrl = `${API_BASE_URL}/members`;
        console.log('API URL:',apiUrl);

        const response = await fetch(apiUrl,{
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include',
        });

        console.log('Response status:',response.status);

        let data;
        try
        {
            data = await response.json();
        } catch (jsonError)
        {
            throw new Error('Invalid JSON response from server');
        }

        if (!response.ok)
        {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        console.log('✅ Members fetched successfully, count:',data.data?.length || 0);
        return {
            success: true,
            data: data.data,
            message: data.message || 'Members fetched successfully',
        };
    } catch (error)
    {
        console.error('Get Members API Error:',error);

        let errorMessage = 'Failed to fetch members. Please try again.';
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch'))
        {
            errorMessage = 'Cannot connect to server. Please check if the server is running.';
        } else if (error.message)
        {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }
};

// Enhanced Get single member by phone number
export const getMemberByPhone = async (phoneNo) =>
{
    try
    {
        console.log('=== GET MEMBER BY PHONE REQUEST ===');
        console.log('Phone:',phoneNo);

        const apiUrl = `${API_BASE_URL}/member/${phoneNo}`;
        console.log('API URL:',apiUrl);

        const response = await fetch(apiUrl,{
            method: 'GET',
            headers: getHeaders(),
            credentials: 'include',
        });

        console.log('Response status:',response.status);

        let data;
        try
        {
            data = await response.json();
        } catch (jsonError)
        {
            throw new Error('Invalid JSON response from server');
        }

        if (!response.ok)
        {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }

        console.log('✅ Member fetched successfully');
        return {
            success: true,
            data: data.data,
            message: data.message || 'Member fetched successfully',
        };
    } catch (error)
    {
        console.error('Get Member API Error:',error);

        let errorMessage = 'Failed to fetch member. Please try again.';
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch'))
        {
            errorMessage = 'Cannot connect to server. Please check if the server is running.';
        } else if (error.message)
        {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }
};

// Enhanced validation with more detailed feedback
export const validateMemberData = (memberData) =>
{
    console.log('=== VALIDATING MEMBER DATA ===');
    console.log('Input data:',JSON.stringify(memberData,null,2));

    const errors = [];

    // Required fields validation
    if (!memberData.name?.trim())
    {
        errors.push('Name is required');
    } else if (memberData.name.trim().length < 2)
    {
        errors.push('Name must be at least 2 characters long');
    }

    if (!memberData.phoneNo?.trim())
    {
        errors.push('Phone number is required');
    } else
    {
        // Enhanced phone validation
        const phoneDigits = memberData.phoneNo.replace(/\D/g,'');
        if (phoneDigits.length < 10)
        {
            errors.push('Phone number must be at least 10 digits');
        } else if (phoneDigits.length > 15)
        {
            errors.push('Phone number must be no more than 15 digits');
        } else if (!/^\d{10,15}$/.test(phoneDigits))
        {
            errors.push('Please enter a valid phone number (digits only)');
        }
    }

    if (!memberData.feesAmount)
    {
        errors.push('Fees amount is required');
    } else if (isNaN(memberData.feesAmount) || memberData.feesAmount <= 0)
    {
        errors.push('Fees amount must be a positive number');
    }

    if (!memberData.nextDueDate)
    {
        errors.push('Next due date is required');
    } else
    {
        // Validate date format and future date
        const dueDate = new Date(memberData.nextDueDate);
        const today = new Date();
        today.setHours(0,0,0,0);

        if (isNaN(dueDate.getTime()))
        {
            errors.push('Please enter a valid due date');
        } else if (dueDate < today)
        {
            errors.push('Due date should be today or in the future');
        }
    }

    if (!memberData.address?.trim())
    {
        errors.push('Address is required');
    } else if (memberData.address.trim().length < 5)
    {
        errors.push('Address must be at least 5 characters long');
    }

    // Optional field validations
    if (memberData.email && memberData.email.trim())
    {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberData.email))
        {
            errors.push('Please enter a valid email address');
        }
    }

    if (memberData.age && memberData.age.toString().trim())
    {
        const age = parseInt(memberData.age);
        if (isNaN(age) || age < 1 || age > 120)
        {
            errors.push('Please enter a valid age (1-120)');
        }
    }

    // Date validations
    if (memberData.joiningDate)
    {
        const joiningDate = new Date(memberData.joiningDate);
        if (isNaN(joiningDate.getTime()))
        {
            errors.push('Please enter a valid joining date');
        }
    }

    if (memberData.lastPaidOn && memberData.lastPaidOn.trim())
    {
        const lastPaidDate = new Date(memberData.lastPaidOn);
        if (isNaN(lastPaidDate.getTime()))
        {
            errors.push('Please enter a valid last payment date');
        }
    }

    const isValid = errors.length === 0;
    console.log('Validation result:',isValid ? '✅ Valid' : '❌ Invalid');
    if (!isValid)
    {
        console.log('Validation errors:',errors);
    }

    return {
        isValid,
        errors,
    };
};

// Debug utility to log current configuration
export const debugConfiguration = () =>
{
    console.log('=== API CONFIGURATION DEBUG ===');
    console.log('API_BASE_URL:',API_BASE_URL);
    console.log('Environment:',typeof process !== 'undefined' ? 'Node.js-like' : 'Browser');
    console.log('REACT_APP_API_URL:',typeof process !== 'undefined' ? process.env?.REACT_APP_API_URL : 'Not available');
    console.log('Current hostname:',window?.location?.hostname || 'Unknown');
    console.log('Current port:',window?.location?.port || 'Unknown');
    console.log('Current protocol:',window?.location?.protocol || 'Unknown');
    console.log('================================');
};

// Initialize debug logging
debugConfiguration();