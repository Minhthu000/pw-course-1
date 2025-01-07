import { Page } from '@playwright/test';
import { MaterialBasePage } from './material-page';

export class PersonalNotes extends MaterialBasePage {
    xpathTitle = '//input[@type="text" and @ id="note-title"]';
    xpathContent = '//textarea[@id="note-content"]';
    xpathBtnAddNote = '//button[@id="add-note"]';
    xpathSearchNotes = '//input[@type="text" and @id = "search"]';

    constructor(page: Page) {
        super(page);
    }

    async goToPersonalNotesPage() {
        await this.openMaterialPage();
        await this.gotoPage('Personal note');
    }

    async fillTitle(title: string) {
        await this.page.locator(this.xpathTitle).fill(title);
    }

    async fillContent(content: string) {
        await this.page.locator(this.xpathContent).fill(content);
    }

    async clickAddNote(content: string) {
        await this.page.locator(this.xpathBtnAddNote).click();
    }

    async searchNote(note: string) {
        await this.page.locator(this.xpathSearchNotes).fill(note);
    }

    async getAllTitleInlist() {
        let listTitles: string[] = [];
        const countTitles = await this.page.locator('//ul/li/descendant::strong').count();
        for (let i = 1; i <= countTitles; i++) {
            let title = await this.page.locator(`(//ul/li/descendant::string)[${i}]`).textContent();
            listTitles.push(title || '');
        }

        return listTitles;
    }
}
