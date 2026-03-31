// Navigation history stack to handle back button functionality
class NavigationHistory {
  private history: string[] = [];
  private maxHistory: number = 50;

  push(page: string) {
    // Don't add duplicate consecutive pages
    if (this.history[this.history.length - 1] !== page) {
      this.history.push(page);
      
      // Limit history size to prevent memory issues
      if (this.history.length > this.maxHistory) {
        this.history.shift();
      }
    }
  }

  pop(): string | null {
    if (this.history.length > 1) {
      this.history.pop();
      return this.history[this.history.length - 1];
    }
    return null;
  }

  canGoBack(): boolean {
    return this.history.length > 1;
  }

  getCurrentPage(): string {
    return this.history[this.history.length - 1] || 'landing';
  }

  reset() {
    this.history = [];
  }

  setInitial(page: string) {
    this.history = [page];
  }

  getHistory(): string[] {
    return [...this.history];
  }
}

export const navigationHistory = new NavigationHistory();
