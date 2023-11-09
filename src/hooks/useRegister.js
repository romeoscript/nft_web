import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "./api";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export function useRegisterUser() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // This will run when the mutation is successful
      toast.success('Registration successful! Redirecting to login...', {
        position: "top-right",
        autoClose: 3000, // Adjust timing as needed
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Redirect after the toast message
      setTimeout(() => navigate('/login'), 3000); // Adjust the path and timing as needed
    },
    onError: (error) => {
      // This will run when the mutation encounters an error
      toast.error(`Registration failed: ${error.message}`, {
        position: "top-right",
        autoClose: 5000, // Adjust timing as needed
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
}


export function useLoginUser() {
    const navigate = useNavigate();
  
    return useMutation({
      mutationFn: loginUser,
      onSuccess: (data) => {
        console.log(data);
        if (data.token) {
            // Store the token in local storage
            localStorage.setItem('token', data.token);
    
            toast.success('Login successful! Redirecting...');
            setTimeout(() => navigate('/mynft'), 3000); // Navigate to the dashboard or appropriate page after login
          } else {
            // Handle any case where the token is not present
            toast.error('Login successful, but no access token received.');
          }
        },
      onError: (error) => {
        console.log(error);
        // This will run when the mutation encounters an error
        toast.error(`login failed: ${error.message}`, {
          position: "top-right",
          autoClose: 5000, // Adjust timing as needed
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
    });
  }
  
