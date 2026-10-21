
import { expect, Locator, Page } from '@playwright/test';

export class QuizPage {
  readonly page: Page;
  readonly submitButton: Locator;
  readonly result: Locator;
  readonly score: Locator;
  readonly certificate: Locator;
  readonly certificateId: Locator;
  readonly downloadButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.getByTestId('submit-quiz');
    this.result = page.getByTestId('quiz-result');
    this.score = page.getByTestId('quiz-score');
    this.certificate = page.getByTestId('certificate');
    this.certificateId = page.getByTestId('certificate-id');
    this.downloadButton = page.getByTestId('download-certificate');
  }

  async answerAllQuestions() {
    const q1 = this.page.getByTestId('question-q1');
    await q1.getByLabel('An explicit wait for a condition').check();

    const q2 = this.page.getByTestId('question-q2');
    await q2.getByLabel('A dedicated data-testid attribute').check();
    await q2.getByLabel('ARIA role + accessible name').check();

   const q3 = this.page.getByTestId('question-q3');
await q3.getByRole('combobox').selectOption({
  label: 'driver.switchTo().frame()'
});

  const q4 = this.page.getByTestId('question-q4');
await q4.getByPlaceholder('Type your answer').fill('data-testid');
  }

  async submitAnswers() {
    await this.submitButton.click();
  }

  async verifyPassed(minimumScore: number) {
    await expect(this.result).toBeVisible();
    await expect(this.result).toContainText('You passed!');

    const scoreText = (await this.score.innerText()).trim();
    const score = Number(scoreText.replace('%', ''));

    expect(score).toBeGreaterThanOrEqual(minimumScore);
    await expect(this.certificate).toBeVisible();
    await expect(this.certificateId).not.toBeEmpty();
  }

  async downloadCertificate() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadButton.click();

    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBeTruthy();

    console.log(
      `Certificate downloaded: ${download.suggestedFilename()}`
    );
  }
}
