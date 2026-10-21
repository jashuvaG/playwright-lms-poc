

// import { test, expect } from '@playwright/test';

// test('Complete all lessons in Playwright from Zero', async ({ page }) => {
//   // 1. Open the LMS
//  await page.goto('/apps/lms');

//   await page.fill('input[name="login-email"]', 'learner@learnhub.dev');
//   await page.fill('input[name="login-password"]', 'Learn@123');

//   // Click the login button
//   await page.click('button[type="submit"]');

//   await expect(page).toHaveURL(/\/apps\/lms\/courses/);

//   // 3. Open the course, or enroll if necessary
//   const continueLink = page.getByTestId('continue-c2');

//   if (await continueLink.isVisible().catch(() => false)) {
//     await continueLink.click();
//   } else {
//     const courseCard = page.getByTestId('course-card')
//       .filter({ hasText: 'Playwright from Zero' });

//     await expect(courseCard).toBeVisible();

//     await courseCard.getByRole('button', {
//       name: 'Enroll for free',
//     }).click();

//     await expect(continueLink).toBeVisible();
//     await continueLink.click();
//   }

//   await expect(page).toHaveURL(/\/apps\/lms\/course\/c2/);

//   // 4. Discover all lessons dynamically
//   const lessonButtons = page.locator(
//     'aside ol li button[data-testid^="lesson-"]'
//   );

//   const lessonCount = await lessonButtons.count();

//   expect(lessonCount).toBeGreaterThan(0);

//   console.log(`Found ${lessonCount} lessons`);

//   // 5. Play and complete every discovered lesson
//   for (let i = 0; i < lessonCount; i++) {
//     // Select the lesson
//     await lessonButtons.nth(i).click();

//     const lessonTitle = (
//       await page.getByTestId('lesson-title').innerText()
//     ).trim();

//     console.log(
//       `Starting lesson ${i + 1}/${lessonCount}: ${lessonTitle}`
//     );

//     // Start the video
//     await page.getByTestId('play-video').click();

//     // Wait for video progress to reach 100%
//     await expect(
//       page.getByTestId('video-progress')
//     ).toHaveAttribute('aria-valuenow', '100', {
//       timeout: 180000,
//     });

//     // Mark the lesson complete
//     const completeButton = page.getByTestId('mark-complete');

//     await expect(completeButton).toBeEnabled();
//     await completeButton.click();

//     console.log(`Completed: ${lessonTitle}`);
//   }

//   // 6. Report completion and pause for inspection
//   console.log(`Successfully processed ${lessonCount} lessons.`);
  
//   // 6. Verify that the final quiz is unlocked
//   const startQuiz = page.getByTestId('start-quiz');

//   const quizHref = await startQuiz.getAttribute('href');

//   expect(quizHref).toBe('/apps/lms/course/c2/quiz');

//   console.log('Final quiz is unlocked:', quizHref);

//  await page.goto(quizHref!);

//   await expect(page).toHaveURL(/\/apps\/lms\/course\/c2\/quiz$/);

//   console.log('Opened the final quiz.');

//   // 8. Inspect quiz controls
 
//   // Verify that the quiz result is displayed
//   const quizResult = page.getByTestId('quiz-result');
//   await expect(quizResult).toBeVisible();

//   const scoreText = (
//     await page.getByTestId('quiz-score').innerText()
//   ).trim();

//   const score = Number(scoreText.replace('%', ''));

//   console.log(`Quiz score: ${score}%`);

//   // Verify that the learner passed
//   await expect(quizResult).toContainText('You passed!');
//   expect(score).toBeGreaterThanOrEqual(60);

//   // Verify certificate generation
//   const certificate = page.getByTestId('certificate');
//   await expect(certificate).toBeVisible();

//   const certificateId = (
//     await page.getByTestId('certificate-id').innerText()
//   ).trim();

//   expect(certificateId).not.toBe('');

//   console.log(`Certificate generated: ${certificateId}`);

//   // Verify the certificate download control
//   await expect(
//     page.getByTestId('download-certificate')
//   ).toBeVisible();

//   console.log('Quiz passed and certificate verified.');


//   await page.pause();
// })