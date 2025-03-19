import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Card, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useLocation } from "react-router-dom";

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [transactionId, setTransactionId] = useState(location.state?.transactionId || "");
  const [movieName] = useState(location.state?.movieName || "Unknown Movie");
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Avoid unnecessary state update
    if (!transactionId) {
      setTransactionId("TXN" + Math.floor(Math.random() * 1000000));
    }

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    if (!loading) {
      let interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            navigate("/orders");
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [loading, navigate]); // Run only when loading changes

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#F5F5F5"
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "90%",
          padding: 3,
          borderRadius: 4,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        {loading ? (
          <>
            <CircularProgress size={50} />
            <Typography variant="h6" mt={2}>Processing Payment...</Typography>
          </>
        ) : (
          <>
            <CheckCircleIcon color="success" sx={{ fontSize: 50 }} />
            <Typography variant="h5" fontWeight="bold" mt={2}>
              Payment Successful
            </Typography>
            <Typography variant="body1" mt={1} color="textSecondary">
              Movie: <strong>{movieName}</strong>
            </Typography>
            <Typography variant="body1" mt={1} color="textSecondary">
              Transaction ID: <strong>{transactionId}</strong>
            </Typography>
            <Typography variant="body2" mt={2} color="textSecondary">
              Redirecting to Your Orders in {countdown}s...
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
          </>
        )}
      </Card>
    </Box>
  );
};

export default Receipt;
