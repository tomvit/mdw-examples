package com.vitvar.ctu.mdw;

import java.util.Hashtable;

import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.QueueReceiver;
import javax.jms.QueueSession;
import javax.jms.Session;
import javax.jms.TextMessage;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import com.vitvar.ctu.mdw.Config;

public class JMSConsumer implements MessageListener {

	// connection factory
	private QueueConnectionFactory qconFactory;
	
	// connection to a queue
	private QueueConnection qcon;
	
	// session within a connection
	private QueueSession qsession;
	
	// queue receiver that receives a message to the queue
	private QueueReceiver qreceiver;
	
	// queue where the message will be sent to
	private Queue queue;
	
	// callback when the message exist in the queue
	public void onMessage(Message msg) {
		try {
			String msgText;
			if (msg instanceof TextMessage) {
				msgText = ((TextMessage) msg).getText();
			} else {
				msgText = msg.toString();
			}
			System.out.println("Message Received: " + msgText);
		} catch (JMSException jmse) {
			System.err.println("An exception occurred: " + jmse.getMessage());
		}
	}
	
	// create a connection to the WLS using a JNDI context
	public void init(Context ctx, String queueName)
			throws NamingException, JMSException {

		qconFactory = (QueueConnectionFactory) ctx.lookup(Config.JMS_FACTORY);
		qcon = qconFactory.createQueueConnection();
		qsession = qcon.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
		queue = (Queue) ctx.lookup(queueName);

		qreceiver = qsession.createReceiver(queue);
		qreceiver.setMessageListener(this);	
		
		qcon.start();
	}
	
	// close sender, connection and the session
	public void close() throws JMSException {
		qreceiver.close();
		qsession.close();
		qcon.close();
	}
	
	// start receiving messages from the queue
	public void receive(String queueName) throws Exception {
		Hashtable<String, String> env = new Hashtable<String, String>();
		env.put(Context.INITIAL_CONTEXT_FACTORY, Config.JNDI_FACTORY);
		env.put(Context.PROVIDER_URL, Config.PROVIDER_URL);

		InitialContext ic = new InitialContext(env);

		init(ic, queueName);
		
		System.out.println("Connected to " + queue.toString() + ", receiving messages...");
		try {
			synchronized (this) {
				while (true) {
					this.wait();
				}
			}
		} finally {
			close();
			System.out.println("Finished.");
		}
	}
	
	public static void main(String[] args) throws Exception {
		// input arguments
		String queueName = args[0];
		
		// create the producer object and send the message
		JMSConsumer consumer = new JMSConsumer();
		consumer.receive(queueName);
	}
	
}
