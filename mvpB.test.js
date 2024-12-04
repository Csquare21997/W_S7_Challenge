import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'


describe('Sprint 7 Challenge Learner Tests', () => {

  
  // 👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  // Test the following. You can create separate tests or a single test with multiple assertions.

    // [1] sum() // throws an error 'pass valid numbers' 
    test ("sum() // throws an error 'pass valid numbers", () => {
      expect(()=> sum()).toThrowError('pass valid numbers')  
    })
    // [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    test ("sum(2, 'seven') // throws an error 'pass valid numbers", () => {
      expect(()=> sum(2, 'seven')).toThrowError('pass valid numbers')  
    })
    // [3] sum(1, 3) // returns 4
    test ("sum(2, 'seven') ", () => {
      expect( sum(1,3)).toBe (4)  
    })
    // [4] sum('1', 2) // returns 3
    test ("sum(2, 'seven') ", () => {
      expect(sum('1',2)).toBe (3) 
    })
    // [5] sum('10', '3') // returns 13
    test ("sum(2, 'seven') ", () => {
      expect(sum('10','3')).toBe (13) 
    })
  

    describe('Sprint 7 Challenge Learner Tests', () => {

  
  // 👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  // Test the <HelloWorld /> component found below...
  //   - using `screen.queryByText` to capture nodes
  //   - using `toBeInTheDocument` to assert their existence in the DOM
  beforeEach(() => {
    render (<HelloWorld/>)
  })  

    // [1] renders a link that reads "Home"
    test ("renders a link that reads Home" , ()=> {
      const homeLink = screen.queryByText('Home')
      expect (homeLink).toBeInTheDocument ();
    });
    
    // [2] renders a link that reads "About"
    test ("renders a link that reads About" , ()=> {
      const aboutLink = screen.queryByText('About')
      expect (aboutLink).toBeInTheDocument ();
    });
    // [3] renders a link that reads "Blog"
    test ("renders a link that reads Blog" , ()=> {
      const blogLink = screen.queryByText('Blog')
      expect (blogLink).toBeInTheDocument ();
    });
    // [4] renders a text that reads "The Truth"
    test ("renders a link that reads The Truth" , ()=> {
      const truthText = screen.queryByText('The Truth')
      expect (truthText).toBeInTheDocument ();
    });
    // [5] renders a text that reads "JavaScript is pretty awesome"
    test ("renders a link that reads JavaScript is pretty awesome" , ()=> {
      const awesomeText = screen.queryByText('JavaScript is pretty awesome')
      expect (awesomeText).toBeInTheDocument ();
    });
    // [6] renders a text that includes "javaScript is pretty" (use exact = false)
    test ("renders a text that includes javaScript is pretty", ()=> {
      const partialText = screen.queryByText('JavaScript is pretty', {exact:false})
      expect (partialText).toBeInTheDocument ();
    });
  
  test('you can comment out this test', () => {
    expect(true).toBe(true)
  })
})
})

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}
