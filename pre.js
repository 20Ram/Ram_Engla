$(document).ready(function () {
  // Fetch and load users
  function loadUsers() {
    $.get('users.php', function (data) {
      const users = JSON.parse(data);
      $('#user-table tbody').empty();
      users.forEach(user => {
        $('#user-table tbody').append(`
          <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status}</td>
            <td>${user.role}</td>
            <td>${user.activity}</td>
            <td>${user.referrals}</td>
          </tr>
        `);
      });
    });
  }

  // Fetch flagged posts
  function loadFlaggedPosts() {
    $.get('posts.php', function (data) {
      const posts = JSON.parse(data);
      $('#flagged-posts').empty();
      posts.forEach(post => {
        $('#flagged-posts').append(`<li>${post.content}</li>`);
      });
    });
  }

  // Fetch and display analytics
  function loadAnalytics() {
    $.get('analytics.php', function (data) {
      const analytics = JSON.parse(data);
      $('#active-users').text(analytics.activeUsers);
      $('#total-posts').text(analytics.totalPosts);
    });
  }

  // Engagement Metrics Chart (Content Moderation)
  function loadEngagementMetrics() {
    $.get('engagement.php', function (data) {
      const engagementData = JSON.parse(data);

      const ctx = document.getElementById('engagement-chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Views', 'Shares', 'Comments', 'Exits'],
          datasets: [{
            label: 'Post Engagement',
            data: [engagementData.views, engagementData.shares, engagementData.comments, engagementData.exits],
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Matching the theme
            borderColor: 'rgba(75, 192, 192, 1)', // Matching the theme
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  // User Activity and Content Performance Charts
  function loadUserActivityChart() {
    $.get('user-activity.php', function (data) {
      const userActivity = JSON.parse(data);

      const ctx = document.getElementById('user-activity-chart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: userActivity.dates,
          datasets: [{
            label: 'User Activity (Likes, Messages)',
            data: userActivity.activityData,
            borderColor: 'rgba(153, 102, 255, 1)', // Purple line
            backgroundColor: 'rgba(153, 102, 255, 0.2)', // Purple fill
            fill: true
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  // Content Performance Chart
  function loadContentPerformanceChart() {
    $.get('content-performance.php', function (data) {
      const contentPerformance = JSON.parse(data);

      const ctx = document.getElementById('content-performance-chart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: contentPerformance.posts,
          datasets: [{
            label: 'Content Performance (Shares, Comments)',
            data: contentPerformance.performanceData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Red bars
            borderColor: 'rgba(255, 99, 132, 1)', // Red border
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  // Event Listeners
  $('#add-user-btn').click(function () {
    $('#add-user-modal').show();
  });

  $('#close-modal').click(function () {
    $('#add-user-modal').hide();
  });

  $('#submit-new-user').click(function () {
    const name = $('#new-user-name').val();
    const email = $('#new-user-email').val();

    $.post('users.php', { name, email }, function (response) {
      const res = JSON.parse(response);
      alert(res.message);
      loadUsers();
      $('#add-user-modal').hide();
    });
  });

  // Initial Data Load
  loadUsers();
  loadFlaggedPosts();
  loadAnalytics();
  loadEngagementMetrics();
  loadUserActivityChart();
  loadContentPerformanceChart();
});
