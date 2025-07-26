const saveFiltersBtn = document.getElementById('save-filters-btn')
saveFiltersBtn.addEventListener('click', e => {
  const filters = document.querySelectorAll('.filter')
  const rules = []
  const removeRuleIds = []
  filters.forEach((filter, i) => {
    console.log(`Filtering ${filter.value}`)
    const id = i + 1
    removeRuleIds.push(id)
    rules.push({
      id: id,
      priority: 2,
      action: {type: "allow"},
      condition: {
        urlFilter: filter.value,
        resourceTypes: ["main_frame"]
      }
    })
  })
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1, 2],
    addRules: rules
  })
})