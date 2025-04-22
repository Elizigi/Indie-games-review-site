import  { useEffect, useState } from 'react'
import { UserModel } from '../../model/userModel';

const Auth = () => {
    const [userRole, setUserRole] = useState<UserModel>({user:null});

    useEffect(() => {
        fetch("http://localhost:3000/api/users/check-role", {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            setUserRole({user:data.role});
          })
          .catch(() => {
            setUserRole({user:null});
          });
      }, []);
  return (
    {userRole}
  )
}

export default Auth
