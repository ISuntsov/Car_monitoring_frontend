import React/*, { useState, useEffect } */ from 'react';
import PropTypes from 'prop-types';
// import { validator } from '../../../utils/validator';
// import TextField from '../../common/form/textField';
// import SelectField from '../../common/form/selectField';
// import RadioField from '../../common/form/radioField';
// import Loader from '../../ui/loader/loader';
// import BackButton from '../../common/backButton';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     getQualities,
//     getQualitiesLoadingStatus
// } from '../../../store/old/qualities';
// import {
//     getProfessions,
//     getProfessionsLoadingStatus
// } from '../../../store/old/professions';
// import {
//     getCurrentUserData,
//     updateCurrentUserParams
// } from '../../../store/slices/users';

const EditUserPage = ({ userId }) => {
    return <h1>Edit User</h1>;
    
    // const dispatch = useDispatch();
    // const [isLoading, setIsLoading] = useState(true);
    // const [data, setData] = useState({});
    // const [errors, setErrors] = useState({});
    //
    // const currentUser = useSelector(getCurrentUserData());
    //
    // const professions = useSelector(getProfessions());
    // const profLoading = useSelector(getProfessionsLoadingStatus());
    //
    // const qualities = useSelector(getQualities());
    // const qualLoading = useSelector(getQualitiesLoadingStatus());
    //
    // const professionsList = professions.map((profName) => ({
    //     label: profName.name,
    //     value: profName._id
    // }));
    // const qualitiesList = qualities.map((qualName) => ({
    //     label: qualName.name,
    //     value: qualName._id
    // }));
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const isValid = validate();
    //     if (!isValid) return;
    //     const newData = {
    //         ...data,
    //         qualities: data.qualities.map((quality) => quality.value)
    //     };
    //     dispatch(updateCurrentUserParams(newData));
    //
    //     // history.push(`/users/${currentUser._id}`);
    // };
    //
    // function getQualitiesListByIds(qualitiesIds) {
    //     const qualitiesArray = [];
    //     for (const qualId of qualitiesIds) {
    //         for (const quality of qualities) {
    //             if (quality._id === qualId) {
    //                 qualitiesArray.push(quality);
    //                 break;
    //             }
    //         }
    //     }
    //     return qualitiesArray;
    // }
    //
    // const transformData = (data) => {
    //     return getQualitiesListByIds(data).map((qual) => ({
    //         label: qual.name,
    //         value: qual._id
    //     }));
    // };
    //
    // useEffect(() => {
    //     setIsLoading(true);
    //     if (!profLoading && !qualLoading && currentUser) {
    //         setData({
    //             ...currentUser,
    //             qualities: transformData(currentUser.qualities)
    //         });
    //     }
    //     if (currentUser._id) setIsLoading(false);
    // }, [profLoading, qualLoading, currentUser]);
    //
    // useEffect(() => {
    //     if (data && isLoading) {
    //         setIsLoading(false);
    //     }
    // }, [data]);
    //
    // const handleChange = (target) => {
    //     setData((prevState) => ({
    //         ...prevState,
    //         [target.name]: target.value
    //     }));
    // };
    //
    // const validatorConfig = {
    //     name: {
    //         isRequired: {
    //             message: 'Имя обязательно для заполнения'
    //         }
    //     },
    //     email: {
    //         isRequired: {
    //             message: 'Электронная почта обязательная для заполнения'
    //         },
    //         isEmail: {
    //             message: 'Электронная почта введена некорректно'
    //         }
    //     },
    //     profession: {
    //         isRequired: {
    //             message: 'Обязательно выберите профессию'
    //         }
    //     }
    // };
    //
    // useEffect(() => {
    //     validate();
    // }, [data]);
    //
    // const validate = () => {
    //     const errors = validator(data, validatorConfig);
    //     setErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };
    //
    // const isValid = Object.keys(errors).length === 0;
    //
    // if (data) {
    //     return (
    //         <div className="container m-5">
    //             <BackButton/>
    //             <div className="row">
    //                 <div className="col-md-6 offset-md-3 shadow p-4">
    //                     {!isLoading && Object.keys(professions).length > 0 ? (
    //                         <form onSubmit={handleSubmit}>
    //                             <TextField
    //                                 label="Name"
    //                                 name="name"
    //                                 value={data.name}
    //                                 onChange={handleChange}
    //                                 error={errors.name}
    //                             />
    //                             <TextField
    //                                 label="E-mail"
    //                                 name="email"
    //                                 value={data.email}
    //                                 onChange={handleChange}
    //                                 error={errors.email}
    //                             />
    //                             <SelectField
    //                                 label="Выберите Вашу профессию: "
    //                                 defaultOption="Выберите профессию"
    //                                 name="profession"
    //                                 value={data.profession}
    //                                 options={professionsList}
    //                                 onChange={handleChange}
    //                                 error={errors.profession}
    //                             />
    //                             <RadioField
    //                                 options={[
    //                                     { name: 'Male', value: 'male' },
    //                                     { name: 'Female', value: 'female' }
    //                                 ]}
    //                                 value={data.sex}
    //                                 name="sex"
    //                                 onChange={handleChange}
    //                                 label="Выберите Ваш пол:"
    //                             />
    //                             <button
    //                                 type="submit"
    //                                 disabled={!isValid}
    //                                 className="btn btn-primary w-100 mx-auto">
    //                                 Обновить данные
    //                             </button>
    //                         </form>
    //                     ) : (
    //                         <Loader/>
    //                     )}
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
};

EditUserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default EditUserPage;
