class SequenceGenerator {
  constructor(initial = 'AA000') {
    this.prefix = initial.slice(0, 2);
    this.currentNumber = parseInt(initial.slice(2));
    this.currentWidth = initial.slice(2).length;
  }

  getNext() {
    this.currentNumber += 1;

    // If we've reached the maximum for current width (e.g., 999 for width 3)
    if (this.currentNumber > parseInt('9'.repeat(this.currentWidth))) {
      this.currentWidth += 1;
      this.currentNumber = 0;
    }

    // Format number with leading zeros
    const numberPart = this.currentNumber.toString().padStart(this.currentWidth, '0');
    return `${this.prefix}${numberPart}`;
  }

  // Generate multiple sequences at once
  generateSequence(count) {
    const sequences = [];
    for (let i = 0; i < count; i++) {
      sequences.push(this.getNext());
    }
    return sequences;
  }
}

// Example usage
function demoSequence() {
  const generator = new SequenceGenerator();

  console.log('Starting from AA000:');
  console.log('Next 5 normal sequences:');
  for (let i = 0; i < 5; i++) {
    console.log(generator.getNext());
  }

  // Demonstrate transition
  const transitionGenerator = new SequenceGenerator('AA998');
  console.log('\nTransition from AA998 to new format:');
  for (let i = 0; i < 4; i++) {
    console.log(transitionGenerator.getNext());
  }
}

// Export for use in other files
module.exports = SequenceGenerator;

// Run demo if this is the main file
if (require.main === module) {
  demoSequence();
}

