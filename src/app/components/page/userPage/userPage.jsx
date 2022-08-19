import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../../ui/loader/loader';
import UserCard from '../../ui/userCard';
import { useSelector } from 'react-redux';
import { getUserById } from '../../../store/slices/users';
// import QualitiesCard from '../../ui/old/qualitiesCard';
// import MeetingsCard from '../../ui/old/meetingsCard';
// import Comments from '../../ui/old/comments';

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));
    
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <h1>User Page</h1>
                        
                        <UserCard user={user}/>
                        {/*             <QualitiesCard data={user.qualities}/> */}
                        {/*             <MeetingsCard value={user.completedMeetings}/> */}
                        {/*         </div> */}
                        {/*         <div className="col-md-8"> */}
                        {/*             <Comments/> */}
                    </div>
                </div>
            </div>
        );
    } else {
        return <Loader/>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
