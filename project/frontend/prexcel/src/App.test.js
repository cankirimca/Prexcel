import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';
import ChatBotScreen from './pages/ChatBot';
import Login from "./pages/Login";
import MainMenu from './pages/MainMenu';
import UserAccountDetails from './pages/UserAccountDetails';

test('test for login page -- failed login', () => {
  render(<Login />);

  const username_field = screen.getByTestId("login_username_field");
  userEvent.type(username_field, "");

  const password_field = screen.getByTestId("login_password_field");
  userEvent.type(password_field, "");

  const login_button = screen.getByTestId("login_button_id");
  userEvent.click(login_button);

  const error_message = screen.getByTestId("login_error_message_id");
  expect(error_message.textContent).toStrictEqual("Incorrect password or username!");

});


test('test for login page -- successful login', () => {
  render(<Login />);

  const username_field = screen.getByTestId("login_username_field");
  userEvent.type(username_field, "cs492");

  const password_field = screen.getByTestId("login_password_field");
  userEvent.type(password_field, "cs492pass");

  const login_button = screen.getByTestId("login_button_id");
  userEvent.click(login_button);

  const error_message = screen.getByTestId("login_error_message_id");
  expect(error_message.textContent).toStrictEqual("Please re-enter your login credentials.");

});


test('test for signup -- empty fields', () => {
  render(<Login />);

  const username_field = screen.getByTestId("register_username_id");
  userEvent.type(username_field, "");

  const email_field = screen.getByTestId("register_email_id");
  userEvent.type(email_field, "");

  const password_field_1 = screen.getByTestId("register_password_id_1");
  userEvent.type(password_field_1, "");

  const password_field_2 = screen.getByTestId("register_password_id_2");
  userEvent.type(password_field_2, "");

  const signup_button = screen.getByTestId("signup_button_id");
  userEvent.click(signup_button);

  const error_message = screen.getByTestId("signup_error_message_id");
  expect(error_message.textContent).toStrictEqual("Please fill the empty field.");

});


test('test for signup -- signup different passwords', () => {
  render(<Login />);

  const username_field = screen.getByTestId("register_username_id");
  userEvent.type(username_field, "test_username");

  const email_field = screen.getByTestId("register_email_id");
  userEvent.type(email_field, "test_email");

  const password_field_1 = screen.getByTestId("register_password_id_1");
  userEvent.type(password_field_1, "test_password_1");

  const password_field_2 = screen.getByTestId("register_password_id_2");
  userEvent.type(password_field_2, "test_password_2_different");

  const signup_button = screen.getByTestId("signup_button_id");
  userEvent.click(signup_button);

  const error_message = screen.getByTestId("signup_error_message_id");
  expect(error_message.textContent).toStrictEqual("Please re-enter your passwords.");

});


test('test for going back to main menu from my Presentations page', () => {
  render(<MyPresentations />);

  const go_back_button = screen.getByTestId("my_presentations_go_back");
  userEvent.click(go_back_button);

  render(<MainMenu />);
  
  const title = screen.getByTestId("prexcel_title_id");
  expect(title.textContent).toStrictEqual("Prexcel");
});


test('test for going back to main menu from start presentation page', () => {
  render(<MyPresentations />);

  const cancel_button = screen.getByTestId("new_presentation_cancel_button_id");
  userEvent.click(cancel_button);

  render(<MainMenu />);
  
  const title = screen.getByTestId("prexcel_title_id");
  expect(title.textContent).toStrictEqual("Prexcel");
});


test('test for going back to main menu from start presentation page', () => {
  render(<MyPresentations />);

  const cancel_button = screen.getByTestId("new_presentation_cancel_button_id");
  userEvent.click(cancel_button);

  render(<MainMenu />);
  
  const title = screen.getByTestId("prexcel_title_id");
  expect(title.textContent).toStrictEqual("The Multifunctional Presentation Assistant");
});


test('test for going back to main menu from start presentation page', () => {
  render(<MyPresentations />);

  const cancel_button = screen.getByTestId("new_presentation_cancel_button_id");
  userEvent.click(cancel_button);

  render(<MainMenu />);
  
  const title = screen.getByTestId("prexcel_title_id");
  expect(title.textContent).toStrictEqual("Prexcel");
});


test('test for going back to main menu from tutorial page', () => {
  render(<MyPresentations />);

  const cancel_button = screen.getByTestId("tutorial_presentation_cancel_button_id");
  userEvent.click(cancel_button);

  render(<MainMenu />);
  
  const title = screen.getByTestId("prexcel_title_id");
  expect(title.textContent).toStrictEqual("Prexcel");
});


test('test for going back to main menu from user account details', () => {
  render(<ChatBotScreen />);

  const cancel_button = screen.getByTestId("main_menu_button_id");
  userEvent.click(cancel_button);

  render(<MainMenu />);
  
  const title = screen.getByTestId("prexcel_title_id");
  expect(title.textContent).toStrictEqual("Prexcel");
});