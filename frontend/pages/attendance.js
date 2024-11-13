import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/global.css'

export default function Attendance() {
  const [isAttending, setIsAttending] = useState(false);
  const [attendanceStart, setAttendanceStart] = useState(null);
  const [attendanceEnd, setAttendanceEnd] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !localStorage.getItem('loggedIn')) {
      router.push('/login');
    }
  }, [isMounted, router]);

  const handleStartAttendance = () => {
    setIsAttending(true);
    setAttendanceStart(new Date().toLocaleString());
  };

  const handleEndAttendance = () => {
    setIsAttending(false);
    setAttendanceEnd(new Date().toLocaleString());
  };

  const handleLogout = () => {
    if (isMounted) {
      localStorage.removeItem('loggedIn');
      router.push('/login');
    }
  };

  const handleScanQR = () => {
    alert('QR scan feature coming soon!');
  };

  if (!isMounted) return null; // Render nothing until mounted

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-blue-500">
      <div className="w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Attendance</h2>
        <p className="text-center text-gray-600">
          Status: <span className="font-semibold">{isAttending ? 'Attending' : 'Not attending'}</span>
        </p>

        <div className="space-y-4">
          {isAttending ? (
            <>
              <button
                onClick={handleEndAttendance}
                className="w-full py-3 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-150"
              >
                End Attendance
              </button>
              <p className="text-sm text-center text-gray-600">Started at: {attendanceStart}</p>
            </>
          ) : (
            <button
              onClick={handleStartAttendance}
              className="w-full py-3 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-150"
            >
              Start Attendance
            </button>
          )}

          <button
            onClick={handleScanQR}
            className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-150"
          >
            Scan QR
          </button>

          {attendanceEnd && (
            <p className="text-sm text-center text-gray-600">Ended at: {attendanceEnd}</p>
          )}

          <button
            onClick={handleLogout}
            className="w-full py-3 mt-6 text-white bg-gray-800 rounded-md hover:bg-gray-900 transition duration-150"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
