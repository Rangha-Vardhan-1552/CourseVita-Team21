import React, { useState } from 'react';

// Component
const ExperienceForm = ({ onNext, onPrevious }) => {
  const [formData, setFormData] = useState({ company: '', role: '', duration: '' });
  const [errors, setErrors] = useState({ company: '', role: '', duration: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const newErrors = { company: '', role: '', duration: '' };
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext(formData);
    }
  };

  return (
    <div style={styles.formContainer}>
      <div style={styles.formCard}>
        <h2 style={styles.header}>Experience Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="company" style={styles.label}>Company:</label>
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = ''}
              onMouseOver={(e) => e.target.style.borderColor = styles.inputHover.borderColor}
              onMouseOut={(e) => e.target.style.borderColor = ''}
            />
            {errors.company && <div style={styles.error}>{errors.company}</div>}
          </div>
          <div>
            <label htmlFor="role" style={styles.label}>Role:</label>
            <input
              type="text"
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = ''}
              onMouseOver={(e) => e.target.style.borderColor = styles.inputHover.borderColor}
              onMouseOut={(e) => e.target.style.borderColor = ''}
            />
            {errors.role && <div style={styles.error}>{errors.role}</div>}
          </div>
          <div>
            <label htmlFor="duration" style={styles.label}>Duration:</label>
            <input
              type="text"
              name="duration"
              id="duration"
              value={formData.duration}
              onChange={handleChange}
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = ''}
              onMouseOver={(e) => e.target.style.borderColor = styles.inputHover.borderColor}
              onMouseOut={(e) => e.target.style.borderColor = ''}
            />
            {errors.duration && <div style={styles.error}>{errors.duration}</div>}
          </div>
          <div style={styles.buttonContainer}>
            <button
              type="button"
              onClick={onPrevious}
              style={styles.button}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                e.currentTarget.style.transform = styles.buttonHover.transform;
                e.currentTarget.style.boxShadow = styles.buttonHover.boxShadow;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.backgroundColor = styles.buttonActive.backgroundColor;
                e.currentTarget.style.boxShadow = styles.buttonActive.boxShadow;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                e.currentTarget.style.boxShadow = styles.buttonHover.boxShadow;
              }}
            >
              Previous
            </button>
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                e.currentTarget.style.transform = styles.buttonHover.transform;
                e.currentTarget.style.boxShadow = styles.buttonHover.boxShadow;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.backgroundColor = styles.buttonActive.backgroundColor;
                e.currentTarget.style.boxShadow = styles.buttonActive.boxShadow;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
                e.currentTarget.style.boxShadow = styles.buttonHover.boxShadow;
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '400px',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    color: '#333',
    fontSize: '16px',
    fontWeight: 'normal',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    fontFamily: 'Arial, sans-serif',
  },
  inputHover: {
    borderColor: '#0056b3',
  },
  inputFocus: {
    borderColor: '#007bff',
    boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.25)',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    transition: 'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  buttonActive: {
    backgroundColor: '#003d7a',
    transform: 'scale(1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
};

export default ExperienceForm;