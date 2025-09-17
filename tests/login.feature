Feature: Example feature

  Scenario: Basic scenario
    Given I navigate to the example page
    Then I should see the title "Example Domain"

  Scenario Outline: Data-driven scenario
    Given I navigate to the example page
    Then I should see the title "<title>"

    Examples:
      | title          |
      | Example Domain |
      | Another Title  |
