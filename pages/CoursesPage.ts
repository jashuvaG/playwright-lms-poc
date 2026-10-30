
import { expect, Locator, Page } from '@playwright/test';

export class CoursesPage {
  readonly page: Page;
  readonly courseCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.courseCards = page.getByTestId('course-card');
  }

  async open() {
    await this.page.goto('/apps/lms/courses');
  }

  async enrollAndOpenCourse(courseTitle: string, courseId: string) {
    const courseCard = this.courseCards.filter({
      hasText: courseTitle,
    });

    await expect(courseCard).toBeVisible();

    const continueLink = courseCard.getByTestId(
      `continue-${courseId}`
    );

    const enrollButton = courseCard.getByRole('button', {
      name: 'Enroll for free',
    });

    // Enroll only when the learner is not already enrolled.
    if (!(await continueLink.isVisible().catch(() => false))) {
      await expect(enrollButton).toBeVisible();
      await enrollButton.click();

      // Wait for the enrollment state to update.
      await expect(continueLink).toBeVisible();
    }

    // Confirm that the Continue link points to the expected course.
    await expect(continueLink).toHaveAttribute(
      'href',
      `/apps/lms/course/${courseId}`
    );

    // Click Continue and observe navigation together.
    await Promise.all([
      this.page.waitForURL(
        new RegExp(`/apps/lms/course/${courseId}$`)
      ),
      continueLink.click(),
    ]);

    await expect(this.page).toHaveURL(
      new RegExp(`/apps/lms/course/${courseId}$`)
    );
  }
}
