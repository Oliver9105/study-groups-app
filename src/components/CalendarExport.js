import React from 'react';

function CalendarExport({ session }) {
  const exportToGoogleCalendar = () => {
    const startDate = new Date(session.date + ' ' + session.time);
    const endDate = new Date(startDate.getTime() + 90 * 60000); // 90 minutes later

    const formatDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(session.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(session.title)}&location=${encodeURIComponent(session.location || 'Online')}`;
    
    window.open(url, '_blank');
  };

  const exportToICS = () => {
    const startDate = new Date(session.date + ' ' + session.time);
    const endDate = new Date(startDate.getTime() + 90 * 60000);

    const formatICSDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${session.title}
DESCRIPTION:${session.title}
LOCATION:${session.location || 'Online'}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${session.title}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
      <button
        onClick={exportToGoogleCalendar}
        className="btn-view-details"
        style={{ fontSize: '0.875rem' }}
      >
        📅 Google Calendar
      </button>
      <button
        onClick={exportToICS}
        className="btn-view-details"
        style={{ fontSize: '0.875rem' }}
      >
        📥 Export .ics
      </button>
    </div>
  );
}

export default CalendarExport;
