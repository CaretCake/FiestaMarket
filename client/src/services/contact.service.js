import { handleResponse } from '../helpers/export';
import axios from "axios";

export const contactFormService = {
  getAll,
  postContactFormSubmission,
  deleteContactFormSubmissionById
};

function getAll() {
  return axios.get(process.env.REACT_APP_API_URL + '/contact-form-submissions')
    .then(formSubmissions => {
      if (formSubmissions.status === 404) {
        return null;
      }
      return formSubmissions.data;
    })
    .catch(error => handleResponse(error.response));
}

function postContactFormSubmission(reasonForMessage, email, message) {
  return axios.post(process.env.REACT_APP_API_URL + '/contact-form-submissions', {
    reasonForMessage: reasonForMessage,
    email: email,
    message: message
  })
    .then(form => {
      return 'form';
    }).catch(error => handleResponse(error.response));
}

// Delete contact form submission by id (role required)
function deleteContactFormSubmissionById(id) {
  return axios.delete(process.env.REACT_APP_API_URL + `/contact-form-submissions/${id}`)
    .then(res => {
      if (res.status === 404) {
        return null;
      }
      //console.log('info: ' + JSON.stringify(users.data));
      return res.data;
    })
    .catch(error => handleResponse(error.response));
}