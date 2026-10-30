
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { CoursesPage } from '../../pages/CoursesPage';
import { CoursePage } from '../../pages/CoursePage';
import { QuizPage } from '../../pages/quizPage';
import { lmsTestData } from '../../test-data/lms-data';

test('Learner can complete a course and pass the final quiz', async ({ page }) => {
  const email = process.env.LMS_EMAIL;
  const password = process.env.LMS_PASSWORD;

  expect(email, 'Set LMS_EMAIL before running this test').toBeTruthy();
  expect(password, 'Set LMS_PASSWORD before running this test').toBeTruthy();

  const loginPage = new LoginPage(page);
  const coursesPage = new CoursesPage(page);
  const coursePage = new CoursePage(page);
  const quizPage = new QuizPage(page);

  // 1. Log in
  await loginPage.open();
  await loginPage.login(email!, password!);

  // 2. Enroll in the course if needed and open it
  await coursesPage.enrollAndOpenCourse(
    lmsTestData.courseTitle,
    lmsTestData.courseId
  );

  // 3. Complete all lessons
  await coursePage.completeAllLessons();

  // 4. Open the final quiz
  
// 4. Open the final quiz through the unlocked control
await expect(coursePage.startQuizLink).toBeVisible();
await expect(coursePage.startQuizLink).toBeEnabled();


await expect(coursePage.startQuizLink).toHaveAttribute(
  'href',
  `/apps/lms/course/${lmsTestData.courseId}/quiz`
);

await coursePage.startQuizLink.click();

await expect(page).toHaveURL(
  new RegExp(`/apps/lms/course/${lmsTestData.courseId}/quiz$`),
  { timeout: 15000 }
);

await expect(page.getByTestId('submit-quiz')).toBeVisible();


  await quizPage.answerAllQuestions();
  await quizPage.submitAnswers();

  // 6. Verify passing score and certificate
  await quizPage.verifyPassed(lmsTestData.minimumQuizScore);

  // 7. Download the certificate
  await quizPage.downloadCertificate();


  const questions = page.locator('[data-testid^="question-"]');
const questionCount = await questions.count();

// console.log(`Total quiz questions: ${questionCount}`);

for (let i = 0; i < questionCount; i++) {
  const question = questions.nth(i);

  console.log(`Question ${i + 1}:`);
  console.log('Text:', await question.innerText());
  console.log('Inputs:', await question.locator('input').evaluateAll(inputs =>
    inputs.map(input => ({
      type: (input as HTMLInputElement).type,
      value: (input as HTMLInputElement).value,
      name: (input as HTMLInputElement).name
    }))
  ));
}
});
