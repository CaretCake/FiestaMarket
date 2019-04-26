import { handleResponse } from '../helpers/export';
import axios from "axios";

export const contactFormService = {
  getAll,
  postContactForm,
  deleteSubmission
};

function getAll() {

}

function postContactForm(reasonForMessage, email, message) {
  return axios.post(process.env.REACT_APP_API_URL + '/contact-form-submissions', {
    reasonForMessage: reasonForMessage,
    email: email,
    message: message
  })
    .then(form => {
      return 'form';
    }).catch(error => handleResponse(error.response));
}

function deleteSubmission() {

}