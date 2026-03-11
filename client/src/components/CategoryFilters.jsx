function CategoryFilters({ categories, selectedCategory, counts, onSelect }) {
  return (
    <section className="filters">
      {categories.map((category) => (
        <button
          key={category}
          className={`chip ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
          {category !== 'Todas' && <span>{counts[category] || 0}</span>}
        </button>
      ))}
    </section>
  )
}

export default CategoryFilters
